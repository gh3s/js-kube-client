/**
 * * IMPORTS
 */
const Server = require('4crud')
const { Deployment, CronJob, PersistentVolume, PersistentVolumeClaim } = require('k8sinclient')
const test = true // 'cluster' is for in-cluster clients, 'default' is for out-cluster ones.
/**
 * * INSTANCES
 */
console.log(test)
const server = new Server()
const deployment = new Deployment(test ? 'default' : 'cluster')
const cronjob = new CronJob(test ? 'default' : 'cluster')
const persistentVolume = new PersistentVolume(test ? 'default' : 'cluster')
const persistentVolumeClaim = new PersistentVolumeClaim(test ? 'default' : 'cluster')

/**
 * * CONSTANTS
 */
const port = 8080
/**
 * * MAIN
 */
server
  // DEPLOYMENTS
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
  // CRONJOBS
  .get('/cronjob', (req, res) => {
    cronjob.read('default', req.search.get('name'), (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .post('/cronjob', (req, res) => {
    cronjob.create('default', req.body, (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .delete('/cronjob', (req, res) => {
    cronjob.delete('default', req.search.get('name'), (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  // PERSISTENT VOLUME CLAIMS
  .get('/persistentvolumeclaim', (req, res) => {
    persistentVolumeClaim.read('default', req.search.get('name'), (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .post('/persistentvolumeclaim', (req, res) => {
    persistentVolumeClaim.create('default', req.body, (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .delete('/persistentvolumeclaim', (req, res) => {
    persistentVolumeClaim.delete('default', req.search.get('name'), (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  // PERSISTENT VOLUMES
  .get('/persistentvolume', (req, res) => {
    persistentVolume.read(req.search.get('name'), (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .post('/persistentvolume', (req, res) => {
    console.log('ok')
    persistentVolume.create(req.body, (response) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .delete('/persistentvolume', (req, res) => {
    persistentVolume.delete(req.search.get('name'), (response) => {
      console.log('ok')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(response))
      res.end()
    })
  })
  .start(port, `starting at port ${port}`) // start server at port 8080

/**
 * TODO: implement message and server ip for the start method
 */
