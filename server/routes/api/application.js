const express = require('express');
const router = express.Router();
const dbservice = require('../../integration/database-services');


/**
 * Adds a new application for a user.
 * TODO: Each user must only be able to submit applications of their own
 */
router.post('/', async (req, res) => {
  // TODO: Input validation
  const ssn = req.body.ssn;
  const qualifications = req.body.qualifications;
  const availability = req.body.availability;
  try {
    await dbservice.submitApplication(ssn, qualifications, availability);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({message: 'Something went wrong'});
  }
});

/**
 * Gets all applications (made by applicants).
 * TODO: This should be protected to only be callable by recruiters
 */
router.get('/', async (req, res) => {
  const applications = await dbservice.getAllApplications();
  console.log('fetched applications:', applications);
  res.json(applications);
})

/**
 * Gets a application by SSN
 * TODO: This should be protected to only be callable by recruiters
 */
router.get('/:ssn', async (req, res) => {
  // TODO: Input validation
  const application = await dbservice.getApplicationStatusBySSN(req.params.ssn);
  if (application === null) {
    return res.sendStatus(404);
  }
  res.status(200).json(application);
})

router.delete('/:ssn', async (req, res) => {
  try {
    await dbservice.removeApplicationBySSN(req.params.ssn);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
})

module.exports = router;