const expect = require('chai').expect;
const request = require('request');
const config = require('./configTest');

const applicationUrl = "/api/application";
const url = 'http://localhost:3000' + applicationUrl;
const loginSabinaUrl = 'http://localhost:3000/api/auth?username=sabina&password=sabina';

describe("Testing application", function() {
  /**
   * GETs a specific application by logging in as a user with an application
   */
  describe("GET successfully a specific application", function(){
    it("Returns status code 200", function(done){
      request(loginSabinaUrl, () => {
        request(url, (err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
        done();
      });
    });
  });
});