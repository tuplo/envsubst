type IncludeVariableFn = (
  shellFormat: string | undefined,
  varName: string
) => boolean;
const includeVariable: IncludeVariableFn = (shellFormat, varName) =>
  typeof shellFormat === 'undefined' || shellFormat.indexOf(varName) > -1;

export default includeVariable;
