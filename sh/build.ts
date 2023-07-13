import shell from "@tuplo/shell";

async function main() {
	const $ = shell.$({ verbose: true });

	await $`rm -rf dist`;
	await $`rm -rf cjs`;
	await $`tsc --build tsconfig.build.json`;

	const flags = ["--bundle", "--platform=node", "--minify"];

	await $`esbuild src/cjs/index.cjs --outfile=dist/index.cjs ${flags}`;
	await $`esbuild src/index.ts --format=esm --outfile=dist/index.mjs ${flags}`;

	await $`rm dist/include-variable.js`;
	await $`rm dist/include-variable.d.ts`;
}

main();
