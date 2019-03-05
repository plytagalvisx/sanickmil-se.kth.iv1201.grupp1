# Project overview
This is a school assignment in Design of Global Application IV1201, taken at the Royal Institute of Technology in Stockholm spring term 2019. The contributers for this assignment are: Nicklas Ockelberg, Sabina Hauzenberger and Emil Lindholm Brandt.

Continue reading for information about continuing development, or running the application.

Visit the application at: https://sanickmil-recruitment-app.herokuapp.com/

# About the project

## Front-end

### BootstrapVue
[BootstrapVue](https://bootstrap-vue.js.org/) has been used in order to create the CSS for the web application. This is basically Bootstrap but for Vue applications.
### Validation
[Vuelidate](https://monterail.github.io/vuelidate/) is used in order to validate user input on the front-end side. The validation is done inline the forms. Example of how validation for username could look like in the *script* tag:
```
validations: {
  form: {
    username: {
      required: required
    }
  }
}
```
If the validation fails, the user will see the error message directly. The users can also see when they have fulfilled the requirements by the green check mark. 

## Back-end
[Express](https://expressjs.com/) is used as the web framework for back-end. 

## Test
### Running tests
Run ```npm test``` in the root folder of the project. The command starts the server and run the tests automatically.

### About tests
[Mocha](https://mochajs.org/) has been used as the test framework which runs on NodeJS and [Chai](https://www.chaijs.com/) is a BDD/TDD assertion library.

All test files are in **server/test**. Example of a test which tests that the status code is correct when login credentials are wrong:
```
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

Authorization Guard E
db-transafer (dev) E
config.js (for getting env vars) N

## Manual

