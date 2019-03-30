[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/environment-selector.svg)](https://www.npmjs.com/package/@advanced-rest-client/environment-selector)

[![Build Status](https://travis-ci.org/advanced-rest-client/environment-selector.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/environment-selector)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/environment-selector)

An element to select current variables environment.

Renders a material design dropdown with list of available environments.
It always render `default` environment.

It should be used with combination of:

-   [variables-manager](https://github.com/advanced-rest-client/variables-manager)
-   [arc-models/variables-model](https://github.com/advanced-rest-client/arc-models)

to handle `environment-list` and `environment-current` custom events.

### Example

```html
<environment-selector></environment-selector>
```

```javascript
document.queryElement('environment-selector')
.addEventListener('selected-environment-changed', (e) => {
  console.log(e.detail.value); // Selected environment
});
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/environment-selector
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import './node_odules/@advanced-rest-client/environment-selector/environment-selector.js';
    </script>
  </head>
  <body>
    <environment-selector></environment-selector>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from './node_odules/@polymer/polymer';
import './node_odules/@advanced-rest-client/environment-selector/environment-selector.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <environment-selector></environment-selector>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/environment-selector
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
