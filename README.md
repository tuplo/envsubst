# envsubst

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

> Substitutes the values of environment variables. Based on [GNU envsubst](https://www.gnu.org/software/gettext/manual/html_node/index.html).

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

## Contribute

Contributions are always welcome!

## License

MIT
