---
outline: deep
---

# Constants

Display constants exported by `@almighty-shogun/utils`. Each one is declared `as const`, so its type is the literal character rather than `string`. Use them instead of pasting the raw characters into source files, where they are easy to confuse with visually similar alternatives.

## Importing

```ts
import { BULLET, CELSIUS, FAHRENHEIT } from '@almighty-shogun/utils';
```

## Usage

```ts
import { BULLET, CELSIUS, FAHRENHEIT } from '@almighty-shogun/utils';

const metric = `21 ${CELSIUS}`;
const imperial = `70 ${FAHRENHEIT}`;
const listItem = `${BULLET} Ready`;
```

## MDASH

Em dash, used as a separator between a label and its description.

```ts
declare const MDASH: '—';
```

## NDASH

En dash, used for numeric and date ranges.

```ts
declare const NDASH: '–';
```

## BULLET

Bullet character, used to join inline list items or metadata segments.

```ts
declare const BULLET: '•';
```

## CELSIUS

Degree Celsius unit appended by [`formatCelsius`](./numbers/formatCelsius).

```ts
declare const CELSIUS: '°C';
```

## FAHRENHEIT

Degree Fahrenheit unit appended by [`formatFahrenheit`](./numbers/formatFahrenheit).

```ts
declare const FAHRENHEIT: '°F';
```
