---
outline: deep

params:
    - name: temperature
      description: Temperature value.
      type: number

returns: A whole-degree Fahrenheit label with the `°F` suffix.
---

# formatFahrenheit

Rounds a temperature and appends the Fahrenheit unit. It is intended for display labels where whole-degree precision is enough.

## Importing

```ts
import { formatFahrenheit } from '@almighty-shogun/utils';
```

## Usage

```ts
import { formatFahrenheit } from '@almighty-shogun/utils';

const label = formatFahrenheit(69.6);

// '70 °F'
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatFahrenheit(temperature: number): string;
```
