export function includeVariable(
	shellFormat: string | undefined,
	varName: string
) {
	return (
		typeof shellFormat === "undefined" || shellFormat.indexOf(varName) > -1
	);
}
