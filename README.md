# Project overview
This is a school assignment in Design of Global Application IV1201, taken at the Royal Institute of Technology in Stockholm spring term 2019. The contributers for this assignment are: Nicklas Ockelberg, Sabina Hauzenberger and Emil Lindholm Brandt.

Continue reading for information about continuing development, or running the application.

Visit the application at: https://sanickmil-recruitment-app.herokuapp.com/

# About the project

## Front-end
Vue E
Vuex E
Vue-bootstrap S
Vuelidation S
Vue Router E
#Translation
In order to make the application internationalized we decided to make use of filters in Vue and Vuex's reactiveness which made it really easy to switch between languages.

The way this works is by having a translation file for each language we want to support for example 'lang-en.js'. This file holds key - value pairs where we map keywords to the translation of the given language, in this case English. To extend the internationalization and add another language you would simply create an identical file where you replace the translations to the language of your choosing without changing the keys. You then need to include the language details in the index.js and languages.js file found inside the assets/localization folder and add a flag image in png format to the assets/localization/flags folder where the name of the image file is the same as the id specified in the language.js and index.js files, so for our English example I would name my flag image, en.png.

## Back-end
Express S
Databas E
  Databas-schema E
Tester S
# API Endpoints and methods
The way our application communicates from client side to the server side is by utilizing Axios as our HTTP-client making request to our backend. We have four endpoints that we use and these are seperated for different areas of the application. These areas are for handling applications, skills, users and authentication. 

From the client side the communications always go through something we call "service" which is from which our Axios request are made. Based on which method is called Axios targets the appropriate API route on the server side. If we for example want to add an application Axios will target the /api/application endpoint. After the backend finishes whatever Axios requested from it Axios will return the result to the caller.

## Working with our API endpoints
As previously stated we have the three endpoints that we can utilize, these look as following ```api/auth```, ```api/application```, ```api/user``` and ```api/skills```. We will now go through them and look at the possible methods that you can use. 

### Handling authentication
```api/auth```

Method | Route | Description | Minimum Permissions | Usage
------------ | ------------- | ------------- | ------------- | -------------
 | **GET** | / | Authenticates a user and gives it a token which it can use to authorize itself | Unauthorized | LINK


#### Usage
```GET api/auth/```
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

Method | Route | Description | Minimum Permissions | Usage
------------ | ------------- | ------------- | ------------- | -------------
| **GET** | / | Gets the current application of the logged in user | Applicant | LINK
**GET** | /all | Gets all the applications in the database | Recruiter | LINK
**POST** | / | Adds a application to the database | Applicant | LINK
**PATCH** | / | Changes the application of the logged in user | Applicant | LINK
**PATCH** | /:ssn | Changes the application that the ssn corresponds to | Recruiter | LINK

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

Method | Route | Description | Minimum Permissions | Usage
------------ | ------------- | ------------- | ------------- | -------------
 | **GET** | / | Gets the information of the logged in user | Applicant | LINK
**POST** | / | Creates a new user | Unauthorized | LINK

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

Method | Route | Description | Minimum Permissions | Usage
------------ | ------------- | ------------- | ------------- | -------------
 | **GET** | / | Gets all the qualifications thats in the database | Applicant | LINK

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







Validering S
Authorization Guard E
db-transafer (dev) E
#Configuring environment variables
This application is dependent on some environment variables which have to be set in order for the application to work correctly. These configs can be found in the server directory.

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
