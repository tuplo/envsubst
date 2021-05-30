import { testEnvsubst } from './main-js';

describe('envsubst', () => {
  const oldEnv = process.env;

  afterEach(() => {
    process.env = oldEnv;
  });

  it('is testable with Jest and JavaScript', () => {
    expect.assertions(1);
    process.env = { ENV_VAR1: 'foo' };
    const result = testEnvsubst('$ENV_VAR1');

    const expected = 'foo';
    expect(result).toStrictEqual(expected);
  });
});
