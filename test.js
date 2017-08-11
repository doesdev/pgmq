'use strict'

import test from 'ava'
import pgmq from './index'
const pgOptions = require('./../_secrets/pgmq/config.json')
const channel = 'my_test_channel'
const msg = 'heydair'

test.cb('it listens and notifies', (assert) => {
  pgmq(pgOptions).then(({listen, notify}) => {
    let gotIt = (err, pl) => {
      if (err) throw err
      assert.is(pl, msg)
      assert.end()
    }
    listen(channel, gotIt)
    setTimeout(() => notify(channel, msg, console.error), 2000)
  }).catch((err) => { throw err })
})
