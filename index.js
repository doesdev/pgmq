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
  let notify = (channel, data) => new Promise((resolve, reject) => {
    data = JSON.stringify(data)
    runQuery(pool, sql.notify, [channel, data]).then(resolve).catch(reject)
  })
  let listen = (channel, cb) => {
    channels[channel] = true
    let newCb = (err, payload) => {
      payload = JSON.parse(payload)
      // delete message from _pgmq
      cb(err, JSON.parse(payload.data))
      return runQuery(pool, sql.delete, [payload.id])
    }
    ears.listen(channel, newCb)
  }
  let methods = {listen, notify}
  runQuery(pool, sql.setup).then(() => resolve(methods)).catch(reject)
})
