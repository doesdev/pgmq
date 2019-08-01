'use strict'

const test = require('mvt')
const pgmq = require('./index')
const pgOptions = require('./../_secrets/pgmq/config.json')
const channel = 'my_test_channel'
const msg = 'heydair'

test('it listens and notifies', async (assert) => {
  const { listen, notify } = await pgmq(pgOptions)

  const message = await new Promise((resolve, reject) => {
    listen(channel, (err, d) => err ? reject(err) : resolve(d))
    setTimeout(() => notify(channel, msg, reject), 2000)
  })

  assert.is(message, msg)
})
