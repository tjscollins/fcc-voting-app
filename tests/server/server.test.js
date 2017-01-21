/*global describe it beforeEach done*/
const expect = require('expect');
const request = require('supertest');
const {pollModel} = require('./../../server/models/polls.js');

const {populateServer} = require('./seed.js');
const {app} = require('./../../server.js');

beforeEach(populateServer);

describe('Server Routes', () => {
  describe('/', () => {
    describe('GET', () => {
      it('should respond', (done) => {
        request(app)
          .get('/')
          .send()
          .expect(302)
          .end((err, res) => {
            if (err)
              return done(err);
            done();
          });
      });
    });
  });

  describe('/login', () => {
    describe('GET', () => {
      it('should respond', (done) => {
        request(app)
          .get('/login')
          .send()
          .expect(200)
          .end((err, res) => {
            if (err)
              return done(err);
            done();
          });
      });
    });
  });

  describe('/logout', () => {
    describe('GET', () => {
      it('should respond', (done) => {
        request(app)
          .get('/logout')
          .send()
          .expect(302)
          .end((err, res) => {
            if (err)
              return done(err);
            done();
          });
      });
    });
  });

  describe('/profile', () => {
    describe('GET', () => {
      it('should respond', (done) => {
        request(app)
          .get('/profile')
          .send()
          .expect(302)
          .end((err, res) => {
            if (err)
              return done(err);
            done();
          });
      });
    });
  });

  describe('/createpoll', () => {
    describe('POST', () => {
      it('should respond with 400 if no data is sent', () =>{
        request(app)
        .post('/createpoll')
        .send()
        .expect(400)
        .end((err, res) => {
          if(err)
            return done(err);
          done();
        });
      });

      it('should create a new poll if valid data is sent', () => {
        request(app)
        .post('/createpoll')
        .set('Content-type', 'application/json')
        .send(JSON.stringify({
          question: {
            displayName: 'dispalyName',
            text: 'pollQuestion',
            answers: ['the', 'answers'],
          },
        }))
        .expect(200)
        .end((err, res) => {
          // console.log(res);
          if(err)
            return done(err);
          done();
        });
      });
    });
  });
});
