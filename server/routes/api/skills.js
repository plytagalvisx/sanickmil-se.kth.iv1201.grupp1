const express = require('express');
const router = express.Router();
const dbservice = require('../../integration/database-services')

/**
 * Gets all skills from the Skill collection
 */
router.get('/', async (req, res) => {
  try {
    const skills = await dbservice.getSkills();
    return res.status(200).json(skills);
  } catch (err) {
    return res.status(500).json({message: 'Database connection error'})
  }
})

module.exports = router;