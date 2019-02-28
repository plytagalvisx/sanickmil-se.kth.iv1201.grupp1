const expect = require('chai').expect;
const request = require('request');
const config = require('./configTest');

const skillUrl = config.AUTH_URL + '/api/skills';
const loginUrl = config.AUTH_URL + '/api/auth?username=emil&password=lime';

/**
 * Testing the GET request for the different skills
 */
describe("Authenticate GET request for acquiring skills", function(){
  /**
  * Testing the GET request when the user is logged in correctly
  */
  describe("GET request with successful", function(){
    it("Returns status code 200", function(done){
      request(loginUrl, function(){
        request(skillUrl, function(err, res){
          expect(res.statusCode).to.equal(200);
            done();
        });
        done();
      });
    });
  });
});