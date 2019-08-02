/**
@license
Copyright 2016 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement, html, css } from 'lit-element';
import { VariablesConsumerMixin } from '@advanced-rest-client/variables-consumer-mixin/variables-consumer-mixin.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
/**
 * An element to select current variables environment.
 *
 * Renders a material design dropdown with list of available environments.
 * It always render environment **Default** (value `default`).
 *
 * ### Example
 *
 * ```html
 * <environment-selector></environment-selector>
 * ```
 *
 * ```javascript
 * document.queryElement('environment-selector')
 * .addEventListener('selected-environment-changed', (e) => {
 *    console.log(e.detail.value); // Selected environment
 * });
 * ```
 *
 * ### Styling
 *
 * Use variables for `paper-dropdown-menu`, `paper-listbox` and `paper-item`
 * to style the control.
 *
 * @polymer
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 * @appliesMixin VariablesConsumerMixin
 */
class EnvironmentSelector extends VariablesConsumerMixin(LitElement) {
  static get styles() {
    return css`:host {
      display: block;
    }`;
  }

  render() {
    const { noLabelFloat, selected, environments, opened } = this;
    const hasEnvs = !!(environments && environments.length);
    const ariaOpened = opened === true ? 'true' : 'false';
    return html`
    <paper-dropdown-menu
      label="Environment"
      aria-label="Select one of defined environments in the dropdown"
      aria-expanded="${ariaOpened}"
      ?no-label-float="${noLabelFloat}"
      dynamic-align
      @opened-changed="${this._handleOpened}">
      <paper-listbox slot="dropdown-content" .selected="${selected}" attr-for-selected="value" @selected-changed="${this._handleSelection}">
        <paper-item value="default">Default</paper-item>
        ${hasEnvs ? environments.map((item) => html`<paper-item value="${item.name}">${item.name}</paper-item>`) : undefined}
      </paper-listbox>
    </paper-dropdown-menu>`;
  }

  static get properties() {
    return {
      /**
       * Set to make selector's label dissapear after selection has been made.
       */
      noLabelFloat: { type: Boolean },
      /**
       * Selected environment.
       */
      selected: { type: String },
      /**
       * True when the dropdown is opened. It can be used to change the state.
       */
      opened: { tyle: Boolean }
    };
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    const old = this._selected;
    if (old === value) {
      return;
    }
    this._selected = value;
    this.requestUpdate('selected', old);
    this._environmentChanged(value);
    this.dispatchEvent(new CustomEvent('selected-changed', {
      detail: {
        value
      }
    }));
  }

  get onenvironment() {
    return this._onenvironment;
  }

  set onenvironment(value) {
    const key = '_onenvironment';
    if (this[key]) {
      this.removeEventListener('selected-environment-changed', this[key]);
    }
    if (typeof value !== 'function') {
      this[key] = null;
      return;
    }
    this[key] = value;
    this.addEventListener('selected-environment-changed', value);
  }

  constructor() {
    super();
    this._envChangedHandler = this._envChangedHandler.bind(this);
  }

  connectedCallback() {
    /* istanbul ignore else */
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    window.addEventListener('selected-environment-changed', this._envChangedHandler);
  }

  disconnectedCallback() {
    /* istanbul ignore else */
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    window.removeEventListener('selected-environment-changed', this._envChangedHandler);
  }

  /**
   * Handler for the `selected-environment-changed` event.
   * @param {CustomEvent} e
   */
  _envChangedHandler(e) {
    if (e.cancelable || e.composedPath()[0] === this) {
      return;
    }
    this.__cancelEnvChange = true;
    this.selected = e.detail.value;
    this.__cancelEnvChange = false;
  }
  /**
   * Handler for the `selected` property change
   * @param {String} selected
   */
  _environmentChanged(selected) {
    if (this.__cancelEnvChange) {
      // the change has been caused by the external source
      return;
    }
    if (selected === null) {
      this.selected = undefined;
      return;
    }
    if (selected === undefined) {
      return;
    }
    this._dispatchChange(selected);
  }
  /**
   * Dispatches `selected-environment-changed` custom event
   * @param {String} value New value
   * @return {CustomEvent} Dispatched event
   */
  _dispatchChange(value) {
    const e = new CustomEvent('selected-environment-changed', {
      bubbles: true,
      composed: true,
      detail: {
        value
      }
    });
    this.dispatchEvent(e);
    return e;
  }

  _handleSelection(e) {
    this.selected = e.detail.value;
  }

  _handleOpened(e) {
    this.opened = e.detail.value;
  }
  /**
   * Fired when selected environment changed.
   *
   * @event selected-environment-changed
   * @param {String} value Name of selected environment.
   */
}
window.customElements.define('environment-selector', EnvironmentSelector);
