# envsubst

Substitutes the values of environment variables. Based on [GNU envsubst](https://www.gnu.org/software/gettext/manual/html_node/index.html).

<p>
  <img src="https://img.shields.io/npm/v/@tuplo/envsubst">
  <a href="https://codeclimate.com/github/tuplo/envsubst/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/69839856839741fd2133/maintainability" />
  </a>
  <a href="https://codeclimate.com/github/tuplo/envsubst/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/69839856839741fd2133/test_coverage" />
  </a>
  <img src="https://github.com/tuplo/envsubst/workflows/Release/badge.svg">
</p>

## Usage

```ts
import envsubst from '@tuplo/envsubst';
```

**Substitutes the values of environment variables**

```ts
process.env = { ENV_VAR1: 'bar' };

envsubst('foo=$ENV_VAR1'); // → foo=bar

envsubst('foo=${ENV_VAR1}'); // → foo=bar

envsubst('foo={{ENV_VAR1}}'); // → foo=bar
```

**If `shellFormat` is present, replaces only those variables**

```ts
process.env = { ENV_VAR1: 'bar', ENV_VAR2: 'baz' };

envsubst('$ENV_VAR1 $ENV_VAR2', '$ENV_VAR2'); // → $ENV_VAR1 baz
```

## API

### envsubst(input, [shellFormat])

#### input: string

A string with references to environment variables of the form `$VARIABLE`, `${VARIABLE}` or `{{VARIABLE}}`.

#### shellFormat: string

The output consists of the environment variables that are referenced in `shellFormat`.

## Install

```bash
$ npm install @tuplo/envsubst

# or with yarn
$ yarn add @tuplo/envsubst
```

### Contribute

Contributions are always welcome!

### License

> The MIT License (MIT)
>
> Copyright (c) 2020 - 2021 Tuplo.
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
