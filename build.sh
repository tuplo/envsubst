#!/usr/bin/env bash

rimraf dist
tsc --build tsconfig.build.json
esbuild src/index.ts --bundle --platform=node --outfile=dist/index.js
