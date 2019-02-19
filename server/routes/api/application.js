const express = require('express');
const router = express.Router();
const dbservice = require('../../integration/database-services');

/**
 * Adds a new application for a user.
 * TODO: Each user must only be able to submit applications of their own
 */
router.post('/', async (req, res) => {
  const ssn = req.userSSN;
  // TODO: Input validation
  const qualifications = req.body.qualifications;
  const availability = req.body.availability;
  try {
    await dbservice.submitApplication(ssn, qualifications, availability);
    res.sendStatus(201).json({message: 'Successfully submitted application'});
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
router.patch('/', async (req, res) => {
  const ssn = req.userSSN;
  const qualifications = req.body.qualifications;
  const availability = req.body.availability;
  try {
    await dbservice.updateApplication(ssn, {qualifications, availability});
    res.json({message: 'Application edited'});
  } catch (err) {
    console.log('Error in application patch: ', err);
    res.status(500).json({message: err})
  }
});

/**
 * 
 */
router.patch('/:ssn', async (req, res) => {
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
  // TODO: Input validation
  const application = await dbservice.getApplicationStatusBySSN(req.userSSN);
  if (application === null) {
    return res.sendStatus(404);
  }
  res.status(200).json(application);
})

router.delete('/', async (req, res) => {
  try {
    await dbservice.removeApplicationBySSN(req.userSSN);
    res.sendStatus(200).json({message: 'Successfully deleted application'});
  } catch (err) {
    res.sendStatus(500);
  }
})

module.exports = router;