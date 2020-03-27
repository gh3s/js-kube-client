const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

var request = chai.request('localhost:8080');

describe('/polls', function () {
  it('GET', function (done) {
    request
      .get('/')
      .query({name: 'pi'}) 
      .then( function (res) {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        done()
      })
  })
})