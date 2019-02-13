const expect = require('chai').expect;
const request = require('request');
const config = require('./configTest');

const authUrl = "/api/auth";
const url = config.AUTH_URL + authUrl;

/**
 * Tests the authentication for POST and GET requests.
 */
describe("Authenticate GET requests for login", function(){
  /**
   * Tests the authentication for GET requests, when the input is correct. Tests both the status code and message.
   */
  describe("GET request, successful login", function(){
    const testUrl =  url + "?username=emil&password=lime";
    it("Returns status code 200", function(done){
      request(testUrl, function(err, res) {
        expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it("Returns message 'Successfully authenticated'", function(done){
      request(testUrl, function(err, res, body){
        expect(body).to.equal('{"message":"Successfully authenticated"}');
        done();
      });
    });
  });

  /**
  * Tests the authentication for GET requests, when the input is incorrect. Tests both the status code and message.
  */
  describe("GET request, failed login", function(){
    const testUrl = url + "?username=emil&password=bajs";
    it("Returns status code 401", function(done){
      request(testUrl, function(err, res) {
        expect(res.statusCode).to.equal(401);
        done();
      });
    });
    it("Returns message 'Incorrect username or password'", function(done){
      request(testUrl, function(err, res, body){
        expect(body).to.equal('{"message":"Incorrect username or password"}');
        done();
      });
    });
  });

  describe("GET request, missing input", function(){
    const testUrl = url + "?username=emil";
    it("Returns status code 400", function(done){
      request(testUrl, function(err, res){
        expect(res.statusCode).to.equal(400);
        done();
      });
    });
    it("Returns message 'Authentication failed, please make sure both fields are filled in.'", function(done){
      request(testUrl, function(err, res, body){
        expect(body).to.equal('{"message":"Authentication failed, please make sure both fields are filled in."}');
        done();
      });
    });
  });
});