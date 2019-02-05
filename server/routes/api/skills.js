const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const config = require('../../config');

async function loadSkillCollection() {
  const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });
  return client.db('sanickmil-recruitment').collection('skill');
}
/**
 * Gets all skills from the Skill collection
 */
router.get('/', async (req, res) => {
  const skills = await loadSkillCollection();
  const loadedSkills = skills.find({}, async (err, docs) => {
    if (err) {
      console.log('ERROR!!!1!!', err);
    } else {
      try {
        const found = await docs.toArray();
        const namesOfFound = found.map((ele) => ele.name);
        res.status(200).send(namesOfFound);
      } catch (docsErr) {
        res.status(500).send({
          message: docsErr
        });
      }
    }
  });
});
module.exports = router;