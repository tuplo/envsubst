/* eslint no-template-curly-in-string:off */
import includeVariable from './include-variable';

describe(`include variable`, () => {
  it(`decides if a variable should be replaced by reading a shellFormat`, () => {
    expect.assertions(5);
    const inputs = [
      ['$ENV_VAR1', '$ENV_VAR1'],
      ['$ENV_VAR1', '$ENV_VAR2'],
      ['', '$ENV_VAR1'],
      [undefined, '$ENV_VAR1'],
      ['${ENV_VAR1}', '$ENV_VAR1'],
    ];
    const expected = [true, false, false, true, false];
    inputs.forEach(([shellFormat, varname], i) => {
      const result = includeVariable(shellFormat, varname as string);
      expect(result).toStrictEqual(expected[i]);
    });
  });
});
