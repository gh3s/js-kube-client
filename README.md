# js-kube-client
> A Javascript client dedicated to in-cluster Kubernetes jobs

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/gh3s/js-kube-client/graphs/commit-activity)
[![HitCount](https://img.shields.io/github/issues/gh3s/js-kube-client/total.svg)](http://hits.dwyl.io/GH3S/JS-KUBE-CLIENT)
[![npm](https://img.shields.io/npm/dw/js-kube-client)](https://www.npmjs.com/package/js-kube-client)

## Getting Started

For those wanting to use Nodejs to interface Kubernetes API, here is been developed an API using native nodejs modules, to be used as deployment that manages jobs.

### Prerequisites

* nodejs 12.x +
* kubernetes 1.17.0 (checked)

### Installing

```sh
npm install js-kube-client --save
```

**POST / PUT** requests `<nodeip>:<nodeport>` with JSON data:
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

**GET / DELETE** requests to `<nodeip>:<nodeport>?name=pi-with-ttl`


## Running

```sh
npm start
```

## Release History

* 0.0.1
    * CHANGE: Work in progress

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
