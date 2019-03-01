const express = require('express');
const router = express.Router();
const dbservice = require('../../integration/database-services')
const ERROR = require('../../helpers/errors')
const Logger = require('../../helpers/logger');

const skillsLogger = new Logger(`${__dirname}/../../../userActions`);

/**
 * Gets all skills from the Skill collection
 */
router.get('/', async (req, res) => {
  try {
    const skills = await dbservice.getSkills();
    return res.status(200).json(skills);
  } catch (err) {
    if (err.errorCode === ERROR.DB.ERROR)
      return res.status(500).json({message: 'Database connection error'})
    skillsLogger.chaos(`Unhandled error in GET /skills:`, err);
    return res.sendStatus(500);
  }
})

module.exports = router;