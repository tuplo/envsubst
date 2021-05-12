import { strict as assert } from 'assert';
import envsubst from '@tuplo/envsubst';

process.env = { ENV_VAR1: 'bar' };
const result = envsubst('foo=$ENV_VAR1');

assert.equal(result, 'foo=bar');
