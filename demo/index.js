import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/variables-manager/variables-manager.js';
import '@advanced-rest-client/arc-models/variables-model.js';
import '../environment-selector.js';

class ComponentDemo extends ArcDemoPage {
  constructor() {
    super();
    this._componentName = 'environment-selector';
    this._formSubmit = this._formSubmit.bind(this);
    this._dataDelete = this._dataDelete.bind(this);
    this.formDelete = this.formDelete.bind(this);
  }

  _formSubmit(e) {
    e.preventDefault();
    const value = e.target.elements.environemt.value;
    if (!value) {
      return;
    }
    const lowerName = name.toLowerCase();
    if (lowerName === 'default') {
      return;
    }
    const obj = {
      name: value,
      created: Date.now()
    };
    const event = new CustomEvent('environment-updated', {
      detail: {
        value: obj
      },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    document.body.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.target.elements.environemt.value = '';
    } else {
      window.alert('Manager not in the DOM');
    }
  }

  _dataDelete() {
    const e = new CustomEvent('destroy-model', {
      detail: {
        models: 'variables'
      },
      bubbles: true,
      composed: true
    });
    document.body.dispatchEvent(e);
  }

  formDelete(e) {
    e.preventDefault();
    const value = e.target.elements.environemt.value;
    if (!value) {
      return;
    }
    const lowerName = name.toLowerCase();
    if (lowerName === 'default') {
      return;
    }

    const envs = document.querySelector('environment-selector').environments;
    if (!envs.find) {
      window.alert('Your browser is ancient! Get another one.');
      return;
    }
    const oldLowerCase = value.toLowerCase();
    const item = envs.find(function(i) {
      return i.name.toLowerCase() === oldLowerCase;
    });
    if (!item) {
      window.alert('The environment is not created.');
      return;
    }
    const ev = new CustomEvent('environment-deleted', {
      detail: {
        id: item._id
      },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    document.body.dispatchEvent(ev);
    if (ev.defaultPrevented) {
      e.target.elements.environemt.value = '';
    } else {
      window.alert('Model not in the DOM');
    }
  }

  contentTemplate() {
    return html`
    <variables-model></variables-model>
    <variables-manager></variables-manager>

    <div class="card">
      <h2>Regular selector</h2>
      <environment-selector></environment-selector>
    </div>

    <div class="card">
      <h2>No floating label</h2>
      <environment-selector nolabelfloat></environment-selector>
    </div>

    <div class="card">
      <h3>Add environment</h3>
      <form method="get" id="form" @submit="${this._formSubmit}">
        <input type="text" name="environemt" placeholder="Environment name">
        <button type="submit" name="save">Add</button>
      </form>

      <h3>Remove environment</h3>
      <form method="get" @submit="${this.formDelete}">
        <input type="text" name="environemt" placeholder="Environment name">
        <button type="submit" name="remove">Remove</button>
      </form>

      <h3>Destroy database</h3>
      <button @click="${this._dataDelete}">Send event</button>
    </div>
    `;
  }
}
const instance = new ComponentDemo();
instance.render();
window.demo = instance;
