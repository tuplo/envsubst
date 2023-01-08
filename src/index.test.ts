/* eslint no-template-curly-in-string:off */
import envsubst from ".";

describe("envsubst", () => {
	const oldEnv = process.env;

	afterEach(() => {
		process.env = oldEnv;
	});

	it("default behavior", () => {
		expect.assertions(1);
		process.env = { ENV_VAR1: "foo" };
		const result = envsubst("$ENV_VAR1");
		const expected = "foo";
		expect(result).toStrictEqual(expected);
	});

	it("default behavior - with shellFormat", () => {
		expect.assertions(1);
		process.env = { ENV_VAR1: "foo", ENV_VAR2: "bar" };
		const result = envsubst("$ENV_VAR1 $ENV_VAR2", "$ENV_VAR2");
		const expected = "$ENV_VAR1 bar";
		expect(result).toStrictEqual(expected);
	});

	it.each([
		["$ENV_VAR1 $ENV_VAR2 $ENV_VAR3", "foo bar $ENV_VAR3"],
		["${ENV_VAR1} ${ENV_VAR2} ${ENV_VAR3}", "foo bar ${ENV_VAR3}"],
		["{{ENV_VAR1}} {{ENV_VAR2}} {{ENV_VAR3}}", "foo bar {{ENV_VAR3}}"],
		["$ENV_VAR1 $ENV_VAR2 $ENV_VAR1", "foo bar foo"],
		["$ENV_VAR1$ENV_VAR2$ENV_VAR3", "foobar$ENV_VAR3"],
		["ENV_VAR1", "ENV_VAR1"],
		["$env_var1 ${env_var2} {{env_var3}}", "baz biz quz"],
	])("replaces environment variables in a string: %s", (input, expected) => {
		expect.assertions(1);
		process.env = {
			...process.env,
			ENV_VAR1: "foo",
			ENV_VAR2: "bar",
			env_var1: "baz",
			env_var2: "biz",
			env_var3: "quz",
		};
		const result = envsubst(input);
		expect(result).toStrictEqual(expected);
	});

	it.each([
		["$ENV_VAR1 $ENV_VAR2 $ENV_VAR3 $ENV_VAR4 $ENV_VAR5", "false  0 null []"],
		["$ENV_VAR1 $ENV_VAR6", "false $ENV_VAR6"],
	])(
		"doesn't replace a variable when it's not present on env: %s",
		(input, expected) => {
			expect.assertions(1);
			process.env = {
				ENV_VAR1: "false",
				ENV_VAR2: "",
				ENV_VAR3: "0",
				ENV_VAR4: "null",
				ENV_VAR5: "[]",
				ENV_VAR6: undefined,
			};
			const result = envsubst(input);
			expect(result).toStrictEqual(expected);
		}
	);

	it.each([
		["$ENV_VAR1 $ENV_VAR2 $ENV_VAR3", "$ENV_VAR2", "$ENV_VAR1 bar $ENV_VAR3"],
		["$ENV_VAR1 $ENV_VAR2 $ENV_VAR3", "", "$ENV_VAR1 $ENV_VAR2 $ENV_VAR3"],
		["$ENV_VAR1$ENV_VAR2$ENV_VAR3", "$ENV_VAR2", "$ENV_VAR1bar$ENV_VAR3"],
		[
			"$ENV_VAR1 $ENV_VAR2 $ENV_VAR3",
			"ENV_VAR2",
			"$ENV_VAR1 $ENV_VAR2 $ENV_VAR3",
		],
	])(
		"replaces only varNames present on shellFormat: %s",
		(input, shellFormat, expected) => {
			expect.assertions(1);
			process.env = { ...process.env, ENV_VAR1: "foo", ENV_VAR2: "bar" };
			const result = envsubst(input, shellFormat);
			expect(result).toStrictEqual(expected);
		}
	);
});
