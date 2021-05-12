# js-kube-client
> A Javascript client dedicated to in-cluster Kubernetes jobs

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/gh3s/js-kube-client/graphs/commit-activity)
[![HitCount](https://img.shields.io/github/issues/gh3s/js-kube-client/total.svg)](http://hits.dwyl.io/GH3S/JS-KUBE-CLIENT)
[![npm](https://img.shields.io/npm/dw/js-kube-client)](https://www.npmjs.com/package/js-kube-client)

## Description

For those wanting to use Nodejs to interface Kubernetes API, here is been developed an API using native nodejs modules, to be used as deployment that manages jobs.

### Prerequisites

* nodejs 12.x +
* docker 18.x +
* kubernetes 1.17.0 (checked)

## Build a docker container 

1. Install docker [https://docs.docker.com/install/](https://docs.docker.com/install/) and build image:
```sh
docker build -t gh3s/js-kube-client -f build/Dockerfile .
```
2. Install kubernetes [https://kubernetes.io/docs/setup/](https://kubernetes.io/docs/setup/) 

## Testing using local server

1. Delete 'cluster' in index.js.
```js
const deployment = new Deployment('cluster')
const cronjob = new CronJob('cluster')
```
2. Start server
```sh
npm start test <port>
```
cluster is a string for in-cluster appliances, default is for test purposes

3. Deploy a test deployment in your cluster and test the code:
```sh
apply -f test/testjob.yaml
```
4. Wait the job starts and search for it.
```sh
curl localhost:<port>/job?name=pi-with-ttl
```

## Run in Kubernetes

1. Apply the deployment.yaml:
```sh
kubectl apply -f kubernetes/deployment.yaml
```
2. Apply service.yaml:
```sh
kubectl apply -f kubernetes/service.yaml
```
3. Create a job using a POST request to `<nodeip>:<nodeport>` where `<nodeip>` is a worker node IP.  Use this JSON data for test purposes:
```JSON
const jobYaml = {
  "apiVersion": "batch/v1",
  "kind": "Job",
  "metadata": {
      "name": "pi-with-ttl"
  },
  "spec": {
      "ttlSecondsAfterFinished": 10,
      "template": {
          "spec": {
              "containers": [{
                  "name": "pi",
                  "image": "perl",
                  "command": [
                      "perl",
                      "-Mbignum=bpi",
                      "-wle",
                      "print bpi(2000)"
                  ]
              }],
              "restartPolicy": "Never"
          }
      }
  }
}
```

4. Verify the job with a GET request to `<nodeip>:<nodeport>/job?name=pi-with-ttl`

5. Delete the job with a DELETE request to the same address.
## NOTES: 
1. For minikube testing: ```minikube service --url js-kube-client```

2. For GKE consider RBAC yaml file inside kubernetes folder


## To update bundle

Update version in:

1. kubernetes/deployment.yaml

2. build/Dockerfile

3. package.json using 'npm init'

4. commit modifications and push to remote

5. publish npm

6. push to dockerhub


## Release History

* 0.0.1
    * CHANGE: Work in progress
* 0.0.3
    * ADDED: Deployments and cronjobs
* 0.0.5
    * ADDED: Persistent volumes and Persistent volume claims
* 0.1.0
    * UPDATE: Security faults corrected
* 0.1.1
    * ADDED: GKE RBAC yaml file

## Authors

* **GH3S** - *Initial work*  - gh3s@protonmail.ch

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contributing
1. Fork it (<https://github.com/gh3s/js-kube-client/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
