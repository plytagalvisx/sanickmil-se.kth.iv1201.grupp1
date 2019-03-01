# sanickmil-se.kth.iv1201.grupp1

## Before running first time
Run ```npm install``` in both client and server directory

## Front-end development

### Running front-end
Run ```npm run serve``` in client directory

### Framework
For front-end, [Vue](https://vuejs.org/) and [Bootstrap-Vue](https://bootstrap-vue.js.org/) has been used as framework. 

### Validation
[Vuelidate](https://monterail.github.io/vuelidate/)

## Back-end development
Written in Node JS

### Running back-end
Run ```npm start``` in root directory

### Framework
For back-end [Express](https://expressjs.com/) has been used as framework.

### Database
[MongoDB](https://www.mongodb.com/) has been used as database driver. There are two collections, user and skill. A user application is stored in the user collection.

### Validation
[Express-validator](https://express-validator.github.io/docs/) has been used to validate user input before sending it to the database. All validations are stored in **server/validation** folder, where each new validation is a new file.

Each failed validation, sends an object with ```{param: e.param, message: e.msg```.

### Test
For testing the back-end code, [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) has been used. Mocha is a JavaScript test framework which runs on NodeJS, Chai is a BDD/TDD assertion library.

All test files should be created in the **test** folder. **_TODO: Förklara lite enkelt hur testen är skrivna också_**

#### Running tests
In order to run the test, one can write ```npm test``` in the root folder of the project. ```npm test``` starts the server and runs the tests automatically.
