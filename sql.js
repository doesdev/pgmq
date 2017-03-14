'use strict'

// setup
const pgmqCols = `(id bigserial PRIMARY KEY, channel text, payload text)`

module.exports = {
  setup: `
    --
    -- create table to store messages
    --
    CREATE TABLE IF NOT EXISTS _pgmq ${pgmqCols};
    --
    -- create notifier functions
    --
    -- (text, text)
    CREATE OR REPLACE FUNCTION pgmq_notify(text, text) RETURNS VOID AS $$
    DECLARE v_id bigint;
    BEGIN
      INSERT INTO _pgmq (channel, payload) VALUES ($1, $2) RETURNING id INTO v_id;
      PERFORM pg_notify($1, json_build_object(
        'id', v_id,
        'data', $2
      )::text);
    END $$
    LANGUAGE plpgsql VOLATILE;
    -- (text, jsonb)
    CREATE OR REPLACE FUNCTION pgmq_notify(text, jsonb) RETURNS VOID AS $$
    DECLARE v_id bigint;
    BEGIN
      INSERT INTO _pgmq (channel, payload) VALUES ($1, $2) RETURNING id INTO v_id;
      PERFORM pg_notify($1, json_build_object(
        'id', v_id,
        'data', $2
      )::text);
    END $$
    LANGUAGE plpgsql VOLATILE;
  `,
  notify: `SELECT pgmq_notify($1::text, $2::text);`
}
