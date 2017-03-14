'use strict'

// setup
const pgmqCols = `(id bigserial PRIMARY KEY, channel text, payload text)`

module.exports = {
  createTbl: `CREATE TABLE IF NOT EXISTS _pgmq ${pgmqCols};`
}
