/* eslint no-template-curly-in-string:off */
const varnames = '[a-zA-Z_]+[a-zA-Z0-9_]*';
const placeholders = ['\\$_', '\\${_}', '{{_}}'];
const envvars = placeholders
  .map(placeholder => placeholder.replace(`_`, `(${varnames})`))
  .join(`|`);
const rgEnvvars = new RegExp(envvars, `g`);

type IncludeVariableFn = (
  shellFormat: string | undefined,
  varname: string
) => boolean;
export const includeVariable: IncludeVariableFn = (shellFormat, varname) =>
  typeof shellFormat === `undefined` || shellFormat.indexOf(varname) > -1;

type EnvsubstFn = (input: string, shellFormat?: string) => string;
const envsubst: EnvsubstFn = (input, shellFormat) => {
  const match = [...input.matchAll(new RegExp(rgEnvvars, `g`))];
  if (!match) return input;
  return match
    .map(m => {
      const [varInput, varname] = m
        .slice(0, placeholders.length + 1)
        .filter(Boolean);
      const value =
        typeof process.env[varname] === `undefined`
          ? varInput
          : process.env[varname];
      return [varInput, value];
    })
    .filter(([varInput]) => varInput && includeVariable(shellFormat, varInput))
    .reduce(
      (acc, [varInput = ``, value = ``]) => acc.replace(varInput, value),
      input
    );
};

export default envsubst;
