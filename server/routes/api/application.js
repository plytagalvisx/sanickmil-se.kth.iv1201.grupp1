const express = require('express');
const router = express.Router();
const dbservice = require('../../integration/database-services');
const { validationResult } = require('express-validator/check');
const validateSubmitApplication = require('../../validation/validateSubmitApplication');
const validatingUpdateStatus = require('../../validation/validateUpdateStatus');
const { prettyValidation } = require('../../helpers/formatValidationError');
const ERROR = require('../../helpers/errors');

/**
 * Adds a new application for a user.
 */
router.post('/', validateSubmitApplication, async (req, res) => {
  const result = validationResult(req); 
  
  if (!result.isEmpty()) {
    const error = prettyValidation(result);
    return res.status(400).json(error);
  }

  const ssn = req.userSSN;

  const qualifications = req.body.qualifications;
  const availability = req.body.availability;
  try {
    await dbservice.submitApplication(ssn, qualifications, availability);
    res.status(201).json({message: 'Successfully submitted application'});
  } catch (err) {
    if (err.errorCode === ERROR.APPLICATION.ALREADY_SUBMITTED) {
      res.status(409).json({message: 'You already submitted this application'});
    }
    console.log('Unhandled error in POST /application');
    res.sendStatus(500);
  }
});

/**
 * PATCH
 * For editing a application partially.
 */
router.patch('/', validateSubmitApplication, async (req, res) => {
  const result = validationResult(req); 
  
  if (!result.isEmpty()) {
    const error = prettyValidation(result);
    return res.status(400).json(error);
  }

  const ssn = req.userSSN;
  const qualifications = req.body.qualifications;
  const availability = req.body.availability;
  try {
    await dbservice.updateApplication(ssn, {qualifications, availability});
    res.status(201).json({message: 'Application edited'});
  } catch (err) {
    if (err.errorCode === ERROR.APPLICATION.INCOMPLETE_PARAMS) {
      return res.status(400).json({message: 'Missing paramters. You must submitt at least one qualification and one availability range.'});
    }
    console.log('Error in application patch: ', err);
    res.sendStatus(500);
  }
});

/**
 * PATCH
 * When a recruiter wants to change an applicants application status
 */
router.patch('/:ssn', validatingUpdateStatus, async (req, res) => {
  const result = validationResult(req); 
  
  if (!result.isEmpty()) {
    const error = prettyValidation(result);
    return res.status(400).json(error);
  }

  const ssn = req.params.ssn;
  const status = req.body.status;
  try {
    await dbservice.handleApplication(ssn, status);
    res.sendStatus(200);
  } catch (err) {
    if (err.errorCode === ERROR.APPLICATION.INCOMPLETE_PARAMS)
      return res.status(400).json({message: 'The status must be accepted, rejected or unhandled'});
    else if (err.errorCode === ERROR.DB.ERROR)
      return res.status(500).json({message: 'Database error'});
    
    console.log('Unhandled error in PATCH /application/:ssn');
    res.sendStatus(500);
  }
});

/**
 * Gets all applications (made by applicants).
 */
router.get('/all', async (req, res) => {
  try {
    const applications = await dbservice.getAllApplications();
    res.json(applications);
  } catch(err) {
    if (err.errorCode === ERROR.APPLICATION.NOT_FOUND) {
      return res.status(404).json({message: 'No applications was found'})
    } else if (err.errorCode === ERROR.DB.ERROR) {
      return res.status(500).json({message: 'Database error.'});
    }
    console.log('Unhandled error in GET /application/all');
    return res.sendStatus(500);
  }
})

/**
 * Get an application for the logged in user
 */
router.get('/', async (req, res) => {
  try {
    const application = await dbservice.getApplicationStatusBySSN(req.userSSN);
    return res.status(200).json(application);
  } catch (err) {
    if (err.errorCode === ERROR.APPLICATION.NOT_FOUND)
      return res.status(404).json({message: 'No application was found.'})
    else if (err.errorCode === ERROR.DB.ERROR)
      return res.status(500).json({message: 'Database error.'})

    console.log('Unhandled error in GET /application');
    return res.sendStatus(500);
  }
})

/**
 * Deletes an application
 */
router.delete('/', async (req, res) => {
  try {
    await dbservice.removeApplicationBySSN(req.userSSN);
    return res.status(200).json({message: 'Successfully deleted application'});
  } catch (err) {
    if (err.errorCode === ERROR.DB.ERROR)
      return res.status(500).json({message: 'Database error'})
    
    console.log('Unhandled error in DELETE /application');
    res.sendStatus(500);
  }
})

module.exports = router;