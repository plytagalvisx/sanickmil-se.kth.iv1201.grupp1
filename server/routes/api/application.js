const express = require('express');
const router = express.Router();
const dbservice = require('../../integration/database-services');
const { validationResult } = require('express-validator/check');
const validateSubmitApplication = require('../../validation/validateSubmitApplication');
const validatingUpdateStatus = require('../../validation/validateUpdateStatus');
const { prettyValidation } = require('../../helpers/formatValidationError');

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
    if (err === 'APPLICATIONS_ALREADY_EXISTS') {
      res.status(409).json({message: 'You already submitted this application'});
    }
    res.status(500).json({message: 'Something went wrong'});
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
    console.log('Error in application patch: ', err);
    res.status(500).json({message: err})
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
    if (err === 'INCORRECT_PARAMETERS')
      return res.status(401).json({message: 'The status must be accepted, rejected or unhandled'});
    res.status(500).json({message: 'Database error'});
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
    res.json({message: 'Database error'})
  }
})

/**
 * Gets a application by the users SSN
 */
router.get('/', async (req, res) => {
  const application = await dbservice.getApplicationStatusBySSN(req.userSSN);
  if (application === null) {
    return res.sendStatus(404);
  }
  res.status(200).json(application);
})

/**
 * Deletes an application
 */
router.delete('/', async (req, res) => {
  try {
    await dbservice.removeApplicationBySSN(req.userSSN);
    return res.status(200).json({message: 'Successfully deleted application'});
  } catch (err) {
    res.sendStatus(500);
  }
})

module.exports = router;