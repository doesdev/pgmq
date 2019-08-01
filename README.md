# pgmq [![NPM version](https://badge.fury.io/js/pgmq.svg)](https://npmjs.org/package/pgmq)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)   [![Dependency Status](https://dependencyci.com/github/doesdev/pgmq/badge)](https://dependencyci.com/github/doesdev/pgmq)

> Simple messaging with PostgreSQL

# This is a non-functional work in progress. Don't use it yet. Thanks ;)

Also running this will quite litrally create tables in your taterbase and other
such nonsense. If you're gonna use it, read the code and make sure you're cool
with all that's going on (it's not much).

Honestly I don't even use this. In theory it should function, but it's not
really PGs job to be a message queue system. Certainly this isn't enough to
make it such. There are better tools for the job.

## install

```sh
$ npm install --save pgmq
```

## api
- **someArgument** *(argumentType - required|optional)*

## usage

```js
var pgmq = require('pgmq');
pgmq();
```

## License

MIT © [Andrew Carpenter](https://github.com/doesdev)
