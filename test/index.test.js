/* eslint-disable no-undef */
const chai = require('chai')
var chaiHttp = require('chai-http')

chai.use(chaiHttp)

chai
  .request('192.168.88.10:30651')
  .get('?name=pi')
  .end(function (err, res) {
    // eslint-disable-next-line no-unused-expressions
    chai.expect(err).to.be.null
    chai.expect(res).to.have.status(200)
  })
