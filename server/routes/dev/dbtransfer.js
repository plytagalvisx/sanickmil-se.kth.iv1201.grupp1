const mysql = require('mysql');
const mongodb = require('mongodb');
const express = require('express');
const router = express.Router();
const util = require('util');
const config = require('../../config');

router.get('/', (req, res) => {
  console.log(' > /dev/dbtransfare invoked');
  let connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'recruitment'
  });

  let myQuery = `
  SELECT person.person_id, person.username, person.name, person.surname, person.ssn, person.email, person.password,
  competence.name as competence_name, competence_profile.years_of_experience, role.name AS role_name
  FROM person
  JOIN role ON person.role_id = role.role_id
  LEFT JOIN competence_profile ON competence_profile.person_id = person.person_id
  LEFT JOIN competence on competence_profile.competence_id = competence.competence_id`;
  let users = [];
  connection.query(myQuery, (err, rows) => {
    if (err) {
      console.log(err);
    }
    let user = null;
    let last = null;
    rows.forEach((element) => {
      console.log(' === ROW ===');
      if (last === element.person_id) {
        // Get only period
        user.qualifications.push({
          name: element.competence_name,
          yearsOfExperience: element.years_of_experience
        })
        console.log('duplicate');
      } else {
        user = {};
        user.person_id = element.person_id;
        user.name = element.name;
        user.role = element.role_name;
        user.surname = element.surname;
        user.username = element.username;
        user.ssn = element.ssn;
        user.email = element.email;
        user.password = element.password;
        user.applicationStatus = 'unhandled';
        user.qualifications = [];
        if (element.competence_name !== null) {
          user.qualifications.push({
            name: element.competence_name,
            yearsOfExperience: element.years_of_experience
          });
        }
        last = element.person_id;
        users.push(user);
      }
    });
    addAvailability(users, connection, res);
  });
});

function addAvailability(users, connection, res) {
    let innerQuery = `SELECT person.person_id, availability.from_date, availability.to_date
    FROM availability
    RIGHT JOIN person ON availability.person_id = person.person_id
    ORDER BY person_id DESC`;
    connection.query(innerQuery, async (err, rows) => {
      if (err) {
        console.log('Inner error:', err);
      }
      let foundUser = null;
      rows.forEach((ele) => {
        foundUser = users.find(e => e.person_id === ele.person_id);
        if (foundUser.availability === undefined)
          foundUser.availability = [];
        if (ele.from_date !== null) {
          foundUser.availability.push({
            from: ele.from_date,
            to: ele.to_date
          });
        }
      });
      console.log(util.inspect(users, false, null, true));
      const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
        useNewUrlParser: true
      });
      const userCollection = client.db('sanickmil-recruitment').collection('users');
      userCollection.insertMany(users);
      res.send(users);
      connection.end();
    });
}
module.exports = router;