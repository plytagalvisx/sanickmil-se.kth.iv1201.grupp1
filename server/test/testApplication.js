const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

let token = null;

describe('A logged in user should be able to get their application', () => {
  before((done) => {
    chai.request(server)
    .get('/api/auth')
    .query({username: 'emil', password: 'lime'})
    .end((err, res) => {
      token = res.body.access_token;
      done();
    });
  });


  it('Returns status code 200 upon logged in GET /application', (done) => {
    chai.request(server)
      .get('/api/application')
      .set('Authorization', 'Bearer '+token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});