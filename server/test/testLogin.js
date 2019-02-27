const expect = require('chai').expect;
const request = require('request');

const authUrl = "/api/auth/";
const url = 'http://localhost:3000' + authUrl;

/**
 * Tests the authentication for POST and GET requests.
 */
describe("Authenticate GET requests for login", function(){

  /**
   * Tests the authentication for GET requests, when the input is correct. Tests both the status code and message.
   */
  describe("GET request, successful login", function(){
    const testUrl =  url + "?username=sabina&password=sabina";
    it("Returns status code 200", function(done){
      request(testUrl, function(err, res) {
        if (err) {
          console.log("ERROR: ", err);
        }
        expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it(`Returns message '{"message":"Successfully logged in!","role":"applicant"}'`, function(done){
      request(testUrl, function(err, res, body){
        expect(body).to.equal('{"message":"Successfully logged in!","role":"applicant"}');
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

    it("Returns message 'Incorrect username or password'", function(done){
      request(testUrl, function(err, res, body){
        expect(body).to.equal('{"message":"Wrong username or password"}');
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