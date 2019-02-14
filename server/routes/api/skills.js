const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const config = require('../../config');
const dbservice = require('../../integration/database-services')

/**
 * Gets all skills from the Skill collection
 */
router.get('/', async (req, res) => {
  try {
    const skills = await dbservice.getSkills();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({message: 'Database connection error'})
  }
})

module.exports = router;