import { match, stub } from 'sinon';
import fetchAuth from './index';
import test from 'tape';

const AUTH = 'auth';
const FAIL = '/fail';
const FAIL_DATA = {ok: false};
const FAIL_RESPONSE = {
  status: 401,
  statusText: 'forbidden'
};
const INVALID_JSON = '/invalid-json';
const INVALID_JSON_RESPONSE = {
  json: () => { throw new Error() },
  status: 200
};
const OK = '/ok';
const OK_DATA = {ok: true};
const OK_RESPONSE = {
  json: () => OK_DATA,
  status: 200
};

const fetch = stub();
fetch.withArgs(OK, match.object).returns(OK_RESPONSE);
fetch.withArgs(FAIL, match.object).returns(FAIL_RESPONSE);
fetch.withArgs(INVALID_JSON, match.object).returns(INVALID_JSON_RESPONSE);

global.fetch = fetch;

test('#fetchAuth', async t => {
  t.deepEquals(await fetchAuth(OK, AUTH), OK_DATA, 'ok');

  t.deepEquals(fetch.firstCall.args, [OK, {
    headers: {
      Authorization: AUTH,
      'Content-Type': 'application/json'
    }
  }], 'calls fetch with the right params');

  let failThrew = false;
  try {
    await fetchAuth(FAIL, AUTH);
  } catch(err) {
    failThrew = err;
  } finally {
    t.equals(failThrew.message, FAIL_RESPONSE.statusText, `fail throws message set to the response's status text`);
    t.deepEquals(failThrew.response, FAIL_RESPONSE, `fail throws the response object`);
  }

  let invalidJsonThrew = false;
  try {
    await fetchAuth(INVALID_JSON, AUTH);
  } catch(err) {
    invalidJsonThrew = err;
  } finally {
    t.equals(invalidJsonThrew.message, 'Invalid JSON', `invalid json throws message set to "Invalid JSON"`);
    t.ok(invalidJsonThrew.caught instanceof Error, `invalid json throws the caught error`);
    t.deepEquals(invalidJsonThrew.response, INVALID_JSON_RESPONSE, `invalid json throws the response object`);
  }

  t.end();
});
