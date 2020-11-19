# Pinipig

<img src="docs/_images/logo.png" alt="Pinipig" widht="124" height="80"/>

![](https://img.shields.io/github/issues/jmdisuanco/pinipig.svg)
![](https://img.shields.io/github/license/jmdisuanco/pinipig.svg) ![](https://img.shields.io/twitter/url/https/github.com/jmdisuanco/pinipig.svg?style=social)
![](https://img.shields.io/github/commit-activity/y/jmdisuanco/pinipig.svg)

A performant web framework that's easy for developers!

Happy Developers... Happy servers...

## Benchmark

Environment

| Model                                     | Cores | Ram |
| ----------------------------------------- | ----- | --- |
| Intel(R) Core(TM) i7-2720QM CPU @ 2.20GHz | 8     | 4gb |

Results

| Framework | Req/Sec   |
| --------- | --------- |
| pinipig   | 41,315.2  |
| bare      | 25,473.6  |
| fastify   | 22,743.2  |
| express   | 10,233.21 |
| hapi      | 10,389.21 |

Benchmarker tool used can be found here [node-framework-benchmarker](https://github.com/jmdisuanco/node-framework-benchmarker)

Detailed Benchmark report [here](docs/_media/report.json)

results obtained using below configuration

```
{
  "port": 5000,
  "url": "http://localhost",
  "connections": 100,
  "pipelining": 10,
  "duration": 5

}
```

## Documentation

can be found [here](https://pinipig.js.org/)

## What's new

### 1.5.0

- using uWS ~17
- Private/Protected CRUD implemented
- token Utilities -- `init_getJWT`, `verify`, `decode`

### 1.4.11

- added staticFileServer (supports nested directory)

### 1.4.8

- exposed memoize function from core to pinipig.utils
- uWebSockets.js#v16.2.0 (fixed pubsub issue)

### 1.4.4

- getMime utility

### 1.4.0

- Pub/Sub
- Websocket Update
- getRemoteAddress

## What's in version 1.3.0

- Routes
- Async Hooks
  - before
  - after
- Inbuilt File upload
- CORS
- preflight handling
- Async Functional Flow
- WebSockets
- ORM
- CRUD
- Authentication Module
- a lot faster than previous version

### ORM

## Supported DB

- MongoDB
- TingoDB
- reThinkDB
- mySQL
- Redis
- Postgres
- SQLite3
- Arango (untested)
- Cassandra (untested)
- Couchbase (untested)
- Firebird (untested)
- Mongoose (untested)
- Neo4j (untested)
- Riak (untested)

```
  _____    _           _           _
 |  __ \  (_)         (_)         (_)
 | |__) |  _   _ __    _   _ __    _    __ _
 |  ___/  | | | '_ \  | | | '_ \  | |  / _` |
 | |      | | | | | | | | | |_) | | | | (_| |
 |_|      |_| |_| |_| |_| | .__/  |_|  \__, |
                          | |           __/ |
                          |_|          |___/
```

# License

MIT &copy; JOHN MARTIN DISUANCO
