/* eslint no-template-curly-in-string:off */
import includeVariable from './include-variable';

describe('include variable', () => {
  it.each([
    ['$ENV_VAR1', '$ENV_VAR1', true],
    ['$ENV_VAR1', '$ENV_VAR2', false],
    ['', '$ENV_VAR1', false],
    [undefined, '$ENV_VAR1', true],
    ['${ENV_VAR1}', '$ENV_VAR1', false],
  ])(
    `decides if a variable should be replaced by reading a shellFormat - %s`,
    (shellFormat, varName, expected) => {
      const result = includeVariable(shellFormat, varName);
      expect(result).toStrictEqual(expected);
    }
  );
});
