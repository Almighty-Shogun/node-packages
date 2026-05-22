---
outline: deep

params:
    - name: temperature
      description: Temperature value.
      type: number

returns: A formatted Celsius string.
---

# formatCelsius

Rounds a temperature and appends the Celsius unit. It is intended for display labels where whole-degree precision is enough.

## Importing

```ts
import { formatCelsius } from '@almighty-shogun/utils'
```

## Usage

```ts
import { formatCelsius } from '@almighty-shogun/utils'

const label = formatCelsius(21.6)

// '22 °C'
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatCelsius(temperature: number): string;
```
