const express = require('express');
const router = express.Router();
const dbservice = require('../../integration/database-services');
const { validationResult } = require('express-validator/check');
const validateSubmitApplication = require('../../validation/validateSubmitApplication');
const validatingUpdateStatus = require('../../validation/validateUpdateStatus');
const { prettyValidation } = require('../../helpers/formatValidationError');
const { ERROR, SUCCESS } = require('../../../common/messageEnums');
const MyError = require('../../helpers/MyError')
const Logger = require('../../helpers/logger');

const applLogger = new Logger(`${__dirname}/../../../userActions`);

/**
 * POST: Adds a new application for a user.
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
    applLogger.log(`${req.userUsername} submitted their application`);
    res.status(201).json({message: SUCCESS.APPLICATION.SUBMITTED});
  } catch (err) {
    if (!(err instanceof MyError)) {
      applLogger.chaos(`${req.userUsername} Unhandled error in  POST /application!`, err);
      return res.sendStatus(500);
    }
    if (err.errorCode === ERROR.APPLICATION.ALREADY_SUBMITTED) {
      res.status(409).json({message: err.errorCode});
    }
  }
});

/**
 * PATCH: When user wants to edit their application partially
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
    applLogger.log(`${req.userUsername} submitted their application`);
    res.status(201).json({message: SUCCESS.APPLICATION.EDITED});
  } catch (err) {
    if (!(err instanceof MyError)) {
      applLogger.chaos(`${req.userUsername} Unhandled error in PATCH /application!`, err);
      res.sendStatus(500);
    }
    if (err.errorCode === ERROR.APPLICATION.INCOMPLETE_PARAMS) {
      return res.status(400).json({message: err.errorCode});
    }
  }
});

/**
 * PATCH: When a recruiter wants to edit an users application status. 
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
    applLogger.log(`${req.userUsername} has set ${ssn}:s application to ${status}`);
    res.status(200).json({message: SUCCESS.APPLICATION.HANDLED});
  } catch (err) {
    if(!(err instanceof MyError)) {
      applLogger.chaos(`${req.userUsername} Unhandled error in PATCH /application/:ssn`, err);
      res.sendStatus(500);
    }
    if (err.errorCode === ERROR.APPLICATION.INCOMPLETE_PARAMS)
      return res.status(400).json({message: err.errorCode});
    else if (err.errorCode === ERROR.DB.ERROR)
      return res.status(500).json({message: err.errorCode});
    else if (err.errorCode === ERROR.APPLICATION.ALREADY_HANDLED)
      return res.status(409).json({message: err.errorCode});
  
  }
});

/**
 * GET: All applications made by applicants
 */
router.get('/all', async (req, res) => {
  try {
    const applications = await dbservice.getAllApplications();
    applLogger.log(`${req.userUsername} has fetched all applications`);
    res.status(200).json(applications);
  } catch(err) {
    if (!(err instanceof MyError)) {
      applLogger.chaos(`${req.userUsername} Unhandled error in GET /application/all`, err);
      return res.sendStatus(500);
    }
    if (err.errorCode === ERROR.APPLICATION.NOT_FOUND) {
      return res.status(404).json({message: err.errorCode})
    } else if (err.errorCode === ERROR.DB.ERROR) {
      return res.status(500).json({message: err.errorCode});
    }
  }
})

/**
 * GET an application made by the logged in user
 */
router.get('/', async (req, res) => {
  try {
    const application = await dbservice.getApplicationStatusBySSN(req.userSSN);
    // applLogger.log(`${req.userUsername} has fetched their own application`);
    return res.status(200).json(application);
  } catch (err) {
    if (!(err instanceof MyError)) {
      applLogger.chaos(`${req.userUsername} Unhandled error in GET /application`, err);
      return res.sendStatus(500);
    }
    if (err.errorCode === ERROR.APPLICATION.NOT_FOUND)
      return res.status(404).json({message: err.errorCode})
    else if (err.errorCode === ERROR.DB.ERROR)
      return res.status(500).json({message: err.errorCode})
  }
})

/**
 * DELETE an application
 * This is not implemented in front-end
 */
router.delete('/', async (req, res) => {
  try {
    await dbservice.removeApplicationBySSN(req.userSSN);
    applLogger.log(`${req.userUsername} has deleted their own application`);
    return res.status(200).json({message: SUCCESS.APPLICATION.DELETED});
  } catch (err) {
    if (!(err instanceof MyError)) {
      applLogger.chaos(`${req.userUsername} Unhandled error in DELETE /application`, err);
      res.sendStatus(500);
    }
    if (err.errorCode === ERROR.DB.ERROR)
      return res.status(500).json({message: err.errorCode})
  }
})

module.exports = router;