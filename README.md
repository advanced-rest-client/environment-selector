[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/environment-selector.svg)](https://www.npmjs.com/package/@advanced-rest-client/environment-selector)

[![Build Status](https://travis-ci.org/advanced-rest-client/environment-selector.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/environment-selector)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/environment-selector)

An element to select current variables environment. Used with Advanced REST Client.

Renders a material design dropdown with list of available environments. It always renders `default` environment.

It should be used with combination of:

-   [variables-manager](https://github.com/advanced-rest-client/variables-manager)
-   [arc-models/variables-model](https://github.com/advanced-rest-client/arc-models)

to handle `environment-list` and `environment-current` custom events.

Note, it is more convenient to listen on change events on the manager instead of this element. The selector announces new environment to the manager and the manager refreshes the state.

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
      import '@advanced-rest-client/environment-selector/environment-selector.js';
      import '@advanced-rest-client/variables-manager/variables-manager.js';
    </script>
  </head>
  <body>
    <variables-manager></variables-manager>
    <environment-selector></environment-selector>
    <script>
    document.queryElement('environment-selector').onenvironment = (e) => {
      console.log(e.detail.value); // Selected environment
    };
    </script>
  </body>
</html>
```

### In a LitElement template

```javascript
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/environment-selector/environment-selector.js';
import '@advanced-rest-client/variables-manager/variables-manager.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <variables-manager></variables-manager>
    <environment-selector @selected-environment-changed="${this._envChanged}"></environment-selector>
    `;
  }

  _envChanged(e) {
    this.currentEnvironment = e.detail.environment;
  }
}
customElements.define('sample-element', SampleElement);
```

### Development

```sh
git clone https://github.com/advanced-rest-client/environment-selector
cd environment-selector
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
