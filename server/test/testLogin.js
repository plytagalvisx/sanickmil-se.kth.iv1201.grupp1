const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

/**
 * Tests the authentication for POST and GET requests.
 */
describe('A successful login should work', () => {
  it('Returns status code 200', (done) => {
    chai.request(server)
      .get('/api/auth')
      .query({username: 'emil', password: 'lime'})
      .end( (err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('Returns correct parameters', (done) => {
    chai.request(server)
      .get('/api/auth')
      .query({username: 'emil', password: 'lime'})
      .end( (err, res) => {
        res.body.should.have.property('access_token');
        res.body.should.have.property('token_type');
        res.body.token_type.should.equal('Bearer');
        res.body.access_token.should.not.equal('');
        res.body.access_token.should.not.equal(null);
        done();
      });
  });
});

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

  it('Returns correct parameters', (done) => {
    chai.request(server)
      .get('/api/auth')
      .query({username: 'emil', password: 'wrongpassword'})
      .end( (err, res) => {
        res.body.should.have.property('message');
        res.body.message.should.equal('ERROR.AUTH.WRONG_CREDENTIALS');
        done();
      });
  });
});

describe('Login parameter validation should work', () => {
  it('Returns the correct status code', (done) => {
    chai.request(server)
      .get('/api/auth')
      .query({username: 'emil'})
      .end( (err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Identifies the correct mistakes', (done) => {
    chai.request(server)
      .get('/api/auth')
      .query({username: 'emil'})
      .end( (err, res) => {
        res.body.should.be.a('array');
        res.body[0].should.have.property('param');
        res.body[0].param.should.equal('password');
        res.body[0].should.have.property('message');
        res.body[0].message.should.equal('The password can only contain letters and/or numbers');

        res.body[1].should.have.property('param');
        res.body[1].param.should.equal('password');
        res.body[1].should.have.property('message');
        res.body[1].message.should.equal('The password cannot be empty');
        done();
      });
  });
});