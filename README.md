# Project overview
This is a school assignment in Design of Global Application IV1201, taken at the Royal Institute of Technology in Stockholm spring term 2019. The contributers for this assignment are: Nicklas Ockelberg, Sabina Hauzenberger and Emil Lindholm Brandt.

Continue reading for information about continuing development, or running the application.

Visit the application at: https://sanickmil-recruitment-app.herokuapp.com/

# About the project

## Front-end

The front end is a Single Page Application written in Vue. Besides being very fast for the user after the initial load, this is nice from a development perspective since the front and back-end are completely separated.

### VueX
To manage state which the whole or multiple parts of the application shares, VueX is used. This allows for a central but encapsulated storage which is easly debuggable during development. The users credentials/basic user information is stores in one such module, and a job-application state is kept in another module.
Vue-bootstrap S
Vuelidation S
### Vue Router
In order to navigate to different pages in a Single Page Application, the Vue Router is used. This is a high abstraction tool for registering which View-Component to render at different /url/pahts.
Translation N

## Back-end
Express S
### Database
The database used in the project is a MongoDB hosted at mLab. MongoDB databases are, unless something else is the focus, ideal for Node applications, since the saved documents are basically JSON objects which are native to NodeJS.
#### Database Schema
Two collections are used: **user** and **skill**.
Required fields are marde with [req], optional: [opt]. Followed by the Datatype and comments.
Fields which are [opt] should not contain null, undefined or any "empty" value. If omitted the field should not exist.
##### User-collection
```
{
  "username": **[req]** String,
  "password": **[req]** String (**hashed** password),
  "email": **[req]** String,
  "firstname": **[req]** String,
  "lastname": **[req]** String,
  "ssn": **[req]** String (on form yyyymmdd-xxxx),
  "role": **[req]** String Value: "recruit" | "applicant",
  "applicationStatus": **[req]** String Value: "rejected" | "accepted" | "unhandled",
  "availability": *[opt]* Array of objects
    {
      "from": **[req]** Javascript date on "toISOString()-form",
      "to": **[req]** Javascript date on "toISOString()-form"
    }
  "qualifications": *[opt]* Array of objects
    {
      "competenceName": **[req]**, A value from the 'skill'-collection,
      "yearsOfExperience": **[req]** Integer, must be positive.
    }
  ],
  "submissionDate": *[opt]* Javascript date on "toISOString()-form"
}
```

##### Skill-collection
```
{
  **[req]** One array of Strings, name of the skill:
  [
    "Karuselldrift",
    "Bagare"
  ]
}
```
Tester S
API Endpoints and methods N
Validering S
## Authorization Guard
To protect the data there area 3 levels of authorization, 1 being the highest, 3 lowest.
1. Authorized recruiter
2. Authorized applicant / regular user
3. Unauthorized / not logged in
The access is checked from 3 up to 1. And once a users authrization-level has been approved for the specified action/endpoint, the request handled.

Which authorization levels are required for which endpoints/action are showed in the [API endpoints section](#api-endpoints-and-methods).

## Old database transfer (dev-feature)
This is a ugly piece of one-time-use code that transfers the contents of the old business database to the new one. This currently looks for a localhost database on port ```8889```, with database name ```recruitment```. This may be configured in the file, but since its a one time use its not very pretty or well documented but works in its current form ;).

config.js (for getting env vars) N

## Manual

Script för att starta i dev N
Script för att starta lokalt, production nivå N
Script/Metodik för pusha till production N
travis is controlled by .travis.yml N


#### END under refactoras upp

## Before running first time
Run ```npm install``` in both client and server directory

## Front-end development
The website is a single page application.

### Running front-end
Run ```npm run serve``` in client directory

### Framework
For front-end, [Vue](https://vuejs.org/) and [Bootstrap-Vue](https://bootstrap-vue.js.org/) has been used as framework. All physical pages are in the *view* directory, more complicated views are build out of *components*. 

### Validation
[Vuelidate](https://monterail.github.io/vuelidate/) is used in order to validate on front-end side. The validation is done inline with the forms. Example of how validation for username could look like in the *script* tag:
```
validations: {
  form: {
    username: {
      required: required
    }
  }
}
```

### Vuex

### Vue routes

## Back-end development
Written in Node JS

### Running back-end
Run ```npm start``` in root directory

### Framework
For back-end [Express](https://expressjs.com/) has been used as framework.

### Database
[MongoDB](https://www.mongodb.com/) has been used as database driver. There are two collections, user and skill. A user application is stored in the user collection.

#### Database schema

### Validation
[Express-validator](https://express-validator.github.io/docs/) has been used to validate user input before sending it to the database. All validations are stored in **server/validation** folder, where each new validation is a new file.

Each failed validation, sends an object with ```{param: e.param, message: e.msg}```.

### Test

#### Running tests
In order to run the test, one can write ```npm test``` in the root folder of the project. The command starts the server and runs the tests automatically.

#### About tests

For testing the back-end code, [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) has been used. Mocha is a JavaScript test framework which runs on NodeJS, Chai is a BDD/TDD assertion library.

All test files should be created in the **test** folder.
