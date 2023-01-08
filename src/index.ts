/* eslint no-template-curly-in-string:off */
import { includeVariable } from "./include-variable";

const varNames = "[a-zA-Z_]+[a-zA-Z0-9_]*";
const placeholders = ["\\$_", "\\${_}", "{{_}}"];
const envVars = placeholders
	.map((placeholder) => placeholder.replace("_", `(${varNames})`))
	.join("|");
const rgEnvVars = new RegExp(envVars, "gm");

type EnvsubstFn = (input: string, shellFormat?: string) => string;
const envsubst: EnvsubstFn = (input, shellFormat) => {
	const match = input.matchAll(rgEnvVars);
	if (!match) return input;

	return Array.from(match)
		.map((m) => {
			const [varInput, varName] = m
				.slice(0, placeholders.length + 1)
				.filter(Boolean);

			const value =
				typeof process.env[varName] === "undefined"
					? varInput
					: process.env[varName];

			return [varInput, value];
		})
		.filter(([varInput]) => varInput && includeVariable(shellFormat, varInput))
		.reduce(
			(acc, [varInput = "", value = ""]) => acc.replace(varInput, value),
			input
		);
};

export default envsubst;
