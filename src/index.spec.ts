/* eslint no-template-curly-in-string:off */
/* eslint @typescript-eslint/camelcase:off */
import envsubst from '.';

describe(`envsubst`, () => {
  const oldEnv = process.env;

  afterEach(() => {
    process.env = oldEnv;
  });

  it(`default behavior`, () => {
    expect.assertions(1);
    process.env = { ENV_VAR1: `foo` };
    const result = envsubst('$ENV_VAR1');
    const expected = `foo`;
    expect(result).toStrictEqual(expected);
  });

  it(`default behavior - with shellFormat`, () => {
    expect.assertions(1);
    process.env = { ENV_VAR1: `foo`, ENV_VAR2: `bar` };
    const result = envsubst('$ENV_VAR1 $ENV_VAR2', '$ENV_VAR2');
    const expected = `$ENV_VAR1 bar`;
    expect(result).toStrictEqual(expected);
  });

  it(`replaces environment variables in a string`, () => {
    expect.assertions(7);
    process.env = {
      ...process.env,
      ENV_VAR1: `foo`,
      ENV_VAR2: `bar`,
      env_var1: `baz`,
      env_var2: `biz`,
      env_var3: `quz`,
    };
    const inputs = [
      '$ENV_VAR1 $ENV_VAR2 $ENV_VAR3',
      '${ENV_VAR1} ${ENV_VAR2} ${ENV_VAR3}',
      '{{ENV_VAR1}} {{ENV_VAR2}} {{ENV_VAR3}}',
      '$ENV_VAR1 $ENV_VAR2 $ENV_VAR1',
      '$ENV_VAR1$ENV_VAR2$ENV_VAR3',
      'ENV_VAR1',
      '$env_var1 ${env_var2} {{env_var3}}',
    ];
    const expected = [
      `foo bar $ENV_VAR3`,
      'foo bar ${ENV_VAR3}',
      'foo bar {{ENV_VAR3}}',
      'foo bar foo',
      'foobar$ENV_VAR3',
      'ENV_VAR1',
      'baz biz quz',
    ];
    inputs.forEach((input, i) => {
      const result = envsubst(input);
      expect(result).toStrictEqual(expected[i]);
    });
  });

  it(`doesn't replace a variable when it's not present on env`, () => {
    expect.assertions(2);
    process.env = {
      ENV_VAR1: `false`,
      ENV_VAR2: ``,
      ENV_VAR3: `0`,
      ENV_VAR4: `null`,
      ENV_VAR5: `[]`,
      ENV_VAR6: undefined,
    };
    const inputs = [
      '$ENV_VAR1 $ENV_VAR2 $ENV_VAR3 $ENV_VAR4 $ENV_VAR5',
      '$ENV_VAR1 $ENV_VAR6',
    ];
    const expected = ['false  0 null []', 'false $ENV_VAR6'];
    inputs.forEach((input, i) => {
      const result = envsubst(input);
      expect(result).toStrictEqual(expected[i]);
    });
  });

  it(`replaces only varnames present on shellFormat`, () => {
    expect.assertions(4);
    process.env = { ...process.env, ENV_VAR1: `foo`, ENV_VAR2: `bar` };
    const argss = [
      ['$ENV_VAR1 $ENV_VAR2 $ENV_VAR3', '$ENV_VAR2'],
      ['$ENV_VAR1 $ENV_VAR2 $ENV_VAR3', ``],
      ['$ENV_VAR1$ENV_VAR2$ENV_VAR3', '$ENV_VAR2'],
      ['$ENV_VAR1 $ENV_VAR2 $ENV_VAR3', 'ENV_VAR2'],
    ];
    const expected = [
      `$ENV_VAR1 bar $ENV_VAR3`,
      '$ENV_VAR1 $ENV_VAR2 $ENV_VAR3',
      '$ENV_VAR1bar$ENV_VAR3',
      '$ENV_VAR1 $ENV_VAR2 $ENV_VAR3',
    ];
    argss.forEach(([input, shellFormat], i) => {
      const result = envsubst(input, shellFormat);
      expect(result).toStrictEqual(expected[i]);
    });
  });
});
