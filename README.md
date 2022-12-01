# &lt;umd-calendar-feed&gt; element

## Installation

```
$ yarn add @universityofmaryland/calendarfeed
```

## Basic Usage

#### Import the Calendar Feed in your js if you bundle using a transpile with babel or typescript.

```js
import '@universityofmaryland/calendarfeed';
```

#### HTML usage

```html
<umd-calendar-feed
  token="ty5hts_R6EWaNT8zBYqVT8edynE0f9cK"
  categories="92335,92357"
></umd-calendar-feed>
```

## Attribute options

1. Bearer Token (required) - token to authenicate for calendar feed
2. Categories - ids for categories/taxonomies. Defaults to all events if not entered

## License

Distributed under the MIT license. See LICENSE for details.
