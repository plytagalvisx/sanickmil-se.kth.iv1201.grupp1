const expect = require('chai').expect;
const request = require('request');
const config = require('./configTest');

const authUrl = "/api/auth";
const url = config.BASE_AUTH + authUrl;

/**
 * Tests the authentication for POST and GET requests.
 */
describe("Authenticate GET requests for login", function(){

  /**
   * Tests the authentication for GET requests, when the input is correct. Tests both the status code and message.
   */
  describe("GET request, successful login", function(){
    const loginUrl = url + '?username=sabina&password=sabina';

    it("Returns status code 200", function(){
      request(loginUrl, function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  /**
  * Tests the authentication for GET requests, when the input is incorrect. Tests both the status code and message.
  */
  describe("GET request, failed login", function(){
    const testUrl = url + "?username=sabina&password=sabina123";

    it("Returns status code 401", function(done){
      request(testUrl, function(err, res) {
        expect(res.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe("GET request, missing input", function(){
    const testUrl = url + "?username=sabina";
    it("Returns status code 400", function(done){
      request(testUrl, function(err, res){
        expect(res.statusCode).to.equal(400);
        done();
      });
    });
  });
});