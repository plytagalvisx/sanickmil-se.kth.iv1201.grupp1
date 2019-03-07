# Project overview
This is a school assignment in Design of Global Application IV1201, taken at the Royal Institute of Technology in Stockholm spring term 2019. The contributers for this assignment are: Nicklas Ockelberg, Sabina Hauzenberger and Emil Lindholm Brandt.

Continue reading for information about continuing development, or running the application.

Visit the application at: https://sanickmil-recruitment-app.herokuapp.com/

# About the project

## Front-end
The front end is a Single Page Application written in Vue. Besides being very fast for the user after the initial load, this is nice from a development perspective since the front and back-end are completely separated.
# Translation
In order to make the application internationalized we decided to make use of filters in Vue and Vuex's reactiveness which made it really easy to switch between languages.

The way this works is by having a translation file for each language we want to support for example 'lang-en.js'. This file holds key - value pairs where we map keywords to the translation of the given language, in this case English. To extend the internationalization and add another language you would simply create an identical file where you replace the translations to the language of your choosing without changing the keys. You then need to include the language details in the index.js and languages.js file found inside the assets/localization folder and add a flag image in png format to the assets/localization/flags folder where the name of the image file is the same as the id specified in the language.js and index.js files, so for our English example I would name my flag image, en.png.

# Configuring environment variables
This application is dependent on some environment variables which have to be set in order for the application to work correctly. These configs can be found in the server directory in the config.js file.

In bash you can set your environment variables with the export command:

```bash
export DBUSER=yourUser
export DBPW=yourPW
export BASE_URL=yourbaseurl
export PORT=yourport
export NODE_ENV=developmentorproduction
export SECRET=yourSecret
```

It's now hard coded to use our mLab database, but this chould easily be moved out to a variable as well to enable "switching" databases easily.

### VueX
To manage state which the whole or multiple parts of the application shares, VueX is used. This allows for a central but encapsulated storage which is easly debuggable during development. The users credentials/basic user information is stores in one such module, and a job-application state is kept in another module.

### BootstrapVue
[BootstrapVue](https://bootstrap-vue.js.org/) has been used in order to create the CSS for the web application. This is basically Bootstrap but for Vue applications.

### Validation
[Vuelidate](https://monterail.github.io/vuelidate/) is used in order to validate user input on the front-end side. The validation is done inline the forms. Example of how validation for username could look like in the *script* tag:
```json
validations: {
  form: {
    username: {
      required: required
    }
  }
}
```
If the validation fails, the user will see the error message directly. The users can also see when they have fulfilled the requirements by the green check mark.

### Vue Router
In order to navigate to different pages in a Single Page Application, the Vue Router is used. This is a high abstraction tool for registering which View-Component to render at different /url/pahts.
Translation N

## Back-end
The back-end is a REST API and [Express](https://expressjs.com/) is used as the web framework. 

### Database
The database used in the project is a MongoDB hosted at mLab. MongoDB databases are, unless something else is the focus, ideal for Node applications, since the saved documents are basically JSON objects which are native to NodeJS.

#### Database Schema
Two collections are used: **user** and **skill**.
Required fields are marde with [req], optional: [opt]. Followed by the Datatype and comments.
Fields which are [opt] should not contain null, undefined or any "empty" value. If omitted the field should not exist.

##### User-collection
```
{
  "username": [req] String,
  "password": [req] String (<b>hashed<b> password),
  "email": [req] String,
  "firstname": [req] String,
  "lastname": [req] String,
  "ssn": [req] String (on form yyyymmdd-xxxx),
  "role": [req] String Value: "recruit" | "applicant",
  "applicationStatus": [req] String Value: "rejected" | "accepted" | "unhandled",
  "availability": [opt] Array of objects
    {
      "from": [req] Javascript date on "toISOString()-form",
      "to": [req] Javascript date on "toISOString()-form"
    }
  "qualifications": [opt] Array of objects
    {
      "competenceName": [req], A value from the 'skill'-collection,
      "yearsOfExperience": [req] Integer, must be positive.
    }
  ],
  "submissionDate": [opt] Javascript date on "toISOString()-form"
}
```

##### Skill-collection
```
{
  [req] One array of Strings, name of the skill:
  [
    "Karuselldrift",
    "Bagare"
  ]
}
```

## Test
### Running tests
Run ```npm test``` in the root folder of the project. The command starts the server and run the tests automatically.

### About tests
[Mocha](https://mochajs.org/) has been used as the test framework which runs on NodeJS and [Chai](https://www.chaijs.com/) is a BDD/TDD assertion library.

All test files are in **server/test**. Example of a test which tests that the status code is correct when login credentials are wrong:
```javascript
describe('A incorrect login should fail', () => {
  it('Returns status code 401 unauthorized', (done) => {
    chai.request(server)
      .get('/api/auth')
      .query({username: 'emil', password: 'wrongpassword'})
      .end( (err, res) => {
        res.should.have.status(401);
        done();
      });
  });
)};
```

## Validation
[Express-validator](https://express-validator.github.io/docs/) has been used to validate user input before sending it to the database. All validations are stored in **server/validation** folder, where each new validation is a new file.

All failed validations, could also only be one failed validation, are sent as an array with object(s), like this: ```[{param: e.param, message: e.msg}]```. Each failed validation contains which input field, _param_, that failed validation and also the error message, _message_.

## Authorization Guard
To protect the data there area 3 levels of authorization, 1 being the highest, 3 lowest.
1. Authorized recruiter
2. Authorized applicant / regular user
3. Unauthorized / not logged in
The access is checked from 3 up to 1. And once a users authrization-level has been approved for the specified action/endpoint, the request handled.

Which authorization levels are required for which endpoints/action are showed in the [API endpoints section](#api-endpoints-and-methods).

# API Endpoints and methods
The way our application communicates from client side to the server side is by utilizing Axios as our HTTP-client making request to our backend. We have four endpoints that we use and these are seperated for different areas of the application. These areas are for handling applications, skills, users and authentication. 

From the client side the communications always go through something we call "service" which is from which our Axios request are made. Based on which method is called Axios targets the appropriate API route on the server side. If we for example want to add an application Axios will target the /api/application endpoint. After the backend finishes whatever Axios requested from it Axios will return the result to the caller.

## Working with our API endpoints
As previously stated we have the three endpoints that we can utilize, these look as following ```api/auth```, ```api/application```, ```api/user``` and ```api/skills```. We will now go through them and look at the possible methods that you can use. 

### Handling authentication
```api/auth```

Method | Route | Description | Minimum Permissions
------------ | ------------- | ------------- | ------------- 
 | **GET** | / | Authenticates a user and gives it a token which it can use to authorize itself | Unauthorized


#### Usage
```GET api/auth/```
##### Parameters: NO
##### Response
```json
{
  "message": "Successfully logged in",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "username": "Sanickmil",
  "role": "applicant"
}
```

### Handling applications
```api/application```

Method | Route | Description | Minimum Permissions
------------ | ------------- | ------------- | ------------- 
| **GET** | / | Gets the current application of the logged in user | Applicant 
**GET** | /all | Gets all the applications in the database | Recruiter 
**POST** | / | Adds a application to the database | Applicant 
**PATCH** | / | Changes the application of the logged in user | Applicant 
**PATCH** | /:ssn | Changes the application that the ssn corresponds to | Recruiter 

#### Usage

#### ```GET api/application/```
##### Parameters: NO
##### Response:
```json
{
  "email": "bajs@apa.se",
  "firstname": "Nicklas",
  "lastname": "Ockelberg",
  "ssn": "19970629-0000",
  "applicationStatus": "accepted",
  "availability": [
    {
      "from": "2019-02-14T00:00:00.000Z",
      "to": "2019-02-24T00:00:00.000Z"
    }
  ],
  "qualifications": [
    {
      "competenceName": "Karuselldrift",
      "yearsOfExperience": 2
    },
    {
      "competenceName": "Korvgrillning",
      "yearsOfExperience": 130
    }
  ],
  "submissionDate": "2019-02-19T14:54:24.675Z"
}
  ```

------

#### ```GET api/application/all```
##### Parameters: NO
##### Response:
```json
[
  {
    "email": "berg@holm.se",
    "firstname": "Berg",
    "lastname": "Bergholm",
    "ssn": "19990505-9987",
    "applicationStatus": "accepted",
    "availability": [
      {
        "from": "2019-03-16T00:00:00.000Z",
        "to": "2019-03-22T00:00:00.000Z"
      }
    ],
    "qualifications": [
      {
        "competenceName": "Karuselldrift",
        "yearsOfExperience": 3
      }
    ],
    "submissionDate": "2019-03-01T14:47:12.620Z"
  }, ...
]
  ```

 ------


#### ```POST api/application/```
##### Parameters: 
```json
  {
"qualifications": [
    {
      "competenceName": "Sockervaddssnurrare",
      "yearsOfExperience": 3.5
    },
    {
      "competenceName": "HACKARE",
      "yearsOfExperience": 2
    }
  ],
"availability": [
    {
      "from": "2014-07-09T22:00:00.000Z",
      "to": "2014-08-09T22:00:00.000Z"
    }
  ]
}
  ```
##### Response: ONLY STATUS

------

#### ```PATCH api/application/```
##### Parameters:
```json
{
"qualifications": [
{
    "competenceName": "Sockervaddsätare",
    "yearsOfExperience": 8
},
  {
    "competenceName": "Mumsmumsätning",
    "yearsOfExperience": 1
  }
],
"availability": [
    {
    "from": "2013-07-09T22:00:00.000Z",
    "to": "2017-08-09T22:00:00.000Z"
    }
  ]
}
  ```
##### Response: ONLY STATUS


#### ```PATCH api/application/:ssn```
##### Parameters:
```json
  {
  "status": "accepted|rejected"
  }
  ```

##### Response: ONLY STATUS

------

### Handling users

```api/user```

Method | Route | Description | Minimum Permissions
------------ | ------------- | ------------- | -------------
 | **GET** | / | Gets the information of the logged in user | Applicant 
**POST** | / | Creates a new user | Unauthorized 

#### ```GET api/user/```
##### Parameters: NO

##### Response:
```json
{
  "username": "bajs",
  "email": "bajs@apa.se",
  "firstname": "Nicklas",
  "lastname": "Ockelberg",
  "ssn": "19970629-0000",
  "role": "applicant"
}
  ```

------

#### ```POST api/user/```
##### Parameters:
```json
{
  "username": "nick",
  "password": "laslas",
  "email": "niklas3@gmail.com",
  "firstname": "NICKLOS",
  "lastname": "HEHE",
  "ssn": "19970707-1234"
}
  ```

##### Response: ONLY STATUS

### Handling skills

```api/skills```

Method | Route | Description | Minimum Permissions
------------ | ------------- | ------------- | -------------
 | **GET** | / | Gets all the qualifications thats in the database | Applicant

#### ```GET api/skills/```
##### Parameters: NO

##### Response:
```json
[
  "Korvgrillning",
  "Karuselldrift",
  "Jonglera"
]
  ```
# Running the app & Development
#### Start in local development
Run this commmand in both the **client** and **root** directory
```bash
npm install
cd client && npm install
```

Then run this command in the **client** directory

```bash
cd client
npm run serve
```

And then run this command in the **root** directory

```bash
npm run dev
```
The app is not up and running, now browse to the url suggested by the Vue cli

------
#### Start in local production
First make sure you have all the environment variables set as suggested [here](#configuring-environment-variables)
Especially making sure that the NODE_ENV is set to production.
Run this commmand in both the **client** and **root** directory
```bash
npm install
cd client && npm install
```

Then run this command in the **client** directory

```bash
cd client
npm run build
```
Then run this command in the **root** directory

```bash
export NODE_ENV=production
npm run start
```
The app is now up and running on localhost

------


### Old database transfer (dev-feature)
This is a ugly piece of one-time-use code that transfers the contents of the old business database to the new one. This currently looks for a localhost database on port ```8889```, with database name ```recruitment```. This may be configured in the file, but since its a one time use its not very pretty or well documented but works in its current form ;).

### Continious Integration and Continious Delivery

The project is currently hooked up to Travis for continious integration (testing) and to Herokus Continious Delivery/Deployment feature.
Currently the ```master``` branch is tracked, and as a pull request is done on it, Travis will begin to run the tests and build it. if they succeed Heroku will deploy it.

Therefore no pushes/local merges -> pushes will have an effect on the live application.

**NOTE:** Before adding, commiting and pushing, the client must be built as it is now. If you switch to a could platform that supports custom scripts before deployment, this may be done at deploy time.

The workflow should be to work/sync against the ```dev``` branch, branch info seprarate branches. As features are completed and run nicely when merged into the latest ```dev``` branch, a pull request should be done from ```dev```-> ```master```. When the test have passed (and the code has been reviewd denepdning on the team workflow) it may be merged, and will be deployed on Heroku within a few minutes.

The hooks, commands/test to run may be configured in the .travis.yml file.
