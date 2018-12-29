[![Build Status](https://travis-ci.org/advanced-rest-client/api-url-data-model.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/environment-selector)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/environment-selector)

An element to select current variables environment.
*
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
