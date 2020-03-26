/**
 * * IMPORTS
 */
const { Crud } = require('4crud')
const Client = require('k8sinclient')
/**
 * * INSTANCES
 */
const server = new Crud()
const jobClient = new Client('cluster') // 'cluster' is for in-cluster clients, 'default' is for out-cluster ones.
/**
 * * CONSTANTS
 */
const port = 8080
/**
 * * MAIN
 */
server
  .get((req, res) => {
    jobClient.read('default', req.search.get('name'), (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .post((req, res) => {
    jobClient.create('default', req.body, (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .delete((req, res) => {
    jobClient.delete('default', req.search.get('name'), (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .start(port, `starting at port ${port}`) //start server at port 8080

 /**
  * TODO: implement message and server ip for the start method
  */