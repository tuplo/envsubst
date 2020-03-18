# envsubst

<p>
  <a href="https://github.com/tuplo/envsubst/actions">
    <img src="https://github.com/tuplo/envsubst/workflows/Build/badge.svg" alt="Build">
  </a>
  <a href="https://npmjs.org/package/@tuplo/envsubst">
    <img src="https://img.shields.io/npm/v/@tuplo/envsubst.svg" alt="NPM Version">
  </a>
  <img src="https://david-dm.org/tuplo/envsubst.svg">
  <a href="http://commitizen.github.io/cz-cli/">
      <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen Friendly">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release">
  </a>
</p>

Substitutes the values of environment variables. Based on [GNU `envsubst`](https://www.gnu.org/software/gettext/manual/html_node/index.html).

## Install

```bash
$ npm install @tuplo/envsubst

# or with yarn
$ yarn add @tuplo/envsubst
```

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
process.env = { ENV_VAR1: `bar`, ENV_VAR2: `baz` };

envsubst('$ENV_VAR1 $ENV_VAR2', '$ENV_VAR2'); // → $ENV_VAR1 baz
```

## API

### envsubst(input, [shellFormat])

#### input: string

A string with references to environment variables of the form `$VARIABLE`, `${VARIABLE}` or `{{VARIABLE}}`.

#### shellFormat: string

The output consists of the environment variables that are referenced in `shellFormat`.

## Contribute

Contributions are always welcome!

## License

MIT
