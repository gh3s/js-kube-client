/**
 * * IMPORTS
 */
const Server = require('4crud')
const { Job, Deployment, CronJob } = require('k8sinclient')
/**
 * * INSTANCES
 */
const server = new Server()
const deployment = new Deployment('cluster')
const cronjob = new CronJob('cluster')
//const jobClient = new Cronjob() // 'cluster' is for in-cluster clients, 'default' is for out-cluster ones.
/**
 * * CONSTANTS
 */
const port = 8080
/**
 * * MAIN
 */
server
  .get('/deployment', (req, res) => {
    deployment.read('default', req.search.get('name'), (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .post('/deployment', (req, res) => {
    deployment.create('default', req.body, (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .delete('/deployment', (req, res) => {
    deployment.delete('default', req.search.get('name'), (response) => {
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
