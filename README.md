# envsubst

<p>
  <img src="https://packagephobia.now.sh/badge?p=@tuplo/envsubst">
  <img src="https://david-dm.org/tuplo/envsubst.svg">
</p>

Substitutes the values of environment variables. Based on [GNU envsubst](https://www.gnu.org/software/gettext/manual/html_node/index.html).

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
