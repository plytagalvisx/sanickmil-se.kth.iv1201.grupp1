const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

describe('A logged out user should not be able to get skills w/o token', () => {
  it('Returns status code 400 as you supplied no token', (done) => {
    chai.request(server)
      .get('/api/skills')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should return the correct error message', (done) => {
    chai.request(server)
      .get('/api/skills')
      .end((err, res) => {
        res.body.should.have.property('message');
        res.body.message.should.equal('No token supplied');
        done();
      });
  });
});

let token = null;
describe('A logged in user should get the skills', () => {
  // Logs in the user once
  before((done) => {
    chai.request(server)
    .get('/api/auth')
    .query({username: 'emil', password: 'lime'})
    .end((err, res) => {
      token = res.body.access_token;
      done();
    });
  });

  it('Returns status code 200', (done) => {
    chai.request(server)
      .get('/api/skills')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  });

  it('Contains an array of skills', (done) => {
    chai.request(server)
      .get('/api/skills')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.body.should.be.a('array');
        done();
      })
  });
});