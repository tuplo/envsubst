type IncludeVariableFn = (
  shellFormat: string | undefined,
  varname: string
) => boolean;
const includeVariable: IncludeVariableFn = (shellFormat, varname) =>
  typeof shellFormat === `undefined` || shellFormat.indexOf(varname) > -1;

export default includeVariable;
