'use strict'

// setup
const Pg = require('pg').Pool
const pgEars = require('pg-ears')
const sql = require('./sql')

// helpers
const runQuery = (pool, query, params) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) return reject(err)
      client.query(query, params, (err, result) => {
        done(err)
        if (err) return reject(err)
        resolve((result.rows))
      })
    })
  })
}

// main
module.exports = (opts) => new Promise((resolve, reject) => {
  let pool = new Pg(opts)
  let ears = pgEars(opts)
  let channels = {}
  let listen = (channel, cb) => {
    channels[channel] = true
    let newCb = (err, data) => {
      // delete message from _pgmq
      cb(err, data)
    }
    ears.listen(channel, newCb)
  }
  let methods = {listen, notify: ears.notify}
  runQuery(pool, sql.setup).then(() => resolve(methods)).catch(reject)
})
