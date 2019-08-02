import { fixture, assert, aTimeout } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../environment-selector.js';

describe('<environment-selector>', function() {
  async function basicFixture() {
    return (await fixture(`<environment-selector></environment-selector>`));
  }

  describe('environment-selector', () => {
    let element;

    it('Asks for a list of environemnts when attached', async () => {
      const spy = sinon.spy();
      window.addEventListener('environment-list', spy);
      element = await basicFixture();
      assert.isTrue(spy.called);
    });

    it('Asks for a current environemnt when attached', async () => {
      const spy = sinon.spy();
      window.addEventListener('environment-current', spy);
      element = await basicFixture();
      assert.isTrue(spy.called);
    });

    it('Fires selected-environment-changed event', async () => {
      const spy = sinon.spy();
      window.addEventListener('selected-environment-changed', spy);
      element = await basicFixture();
      element.selected = 'test';
      assert.isTrue(spy.called);
    });
  });

  describe('_envChangedHandler()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    it('Does nothing when event is cancelable', () => {
      element._envChangedHandler({
        cancelable: true
      });
      assert.isUndefined(element.selected);
    });

    it('Does nothing when dispatched by self', () => {
      element._envChangedHandler({
        cancelable: false,
        composedPath: () => [element]
      });
      assert.isUndefined(element.selected);
    });

    it('Sets selected property', () => {
      element._envChangedHandler({
        cancelable: false,
        composedPath: () => [],
        detail: {
          value: 'test'
        }
      });
      assert.equal(element.selected, 'test');
    });
  });

  describe('_environmentChanged()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Does nothing when __cancelEnvChange is set', () => {
      element.__cancelEnvChange = true;
      const spy = sinon.spy(element, '_dispatchChange');
      element._environmentChanged();
      assert.isFalse(spy.called);
    });

    it('Does nothing when environment is undefined', () => {
      const spy = sinon.spy(element, '_dispatchChange');
      element._environmentChanged();
      assert.isFalse(spy.called);
    });

    it('Sets environment to undefined when value is null', () => {
      element.selected = null;
      const spy = sinon.spy(element, '_dispatchChange');
      element._environmentChanged(null);
      assert.isUndefined(element.selected);
      assert.isFalse(spy.called);
    });

    it('Calls _dispatchChange() otherwise', () => {
      const spy = sinon.spy(element, '_dispatchChange');
      element._environmentChanged('test');
      assert.isTrue(spy.called);
    });
  });

  describe('_dispatchChange()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    const evDetail = 'test-value';

    it('Dispatches an event', () => {
      const spy = sinon.spy();
      element.addEventListener('selected-environment-changed', spy);
      element._dispatchChange(evDetail);
      assert.isTrue(spy.called);
    });

    it('Returns the event', () => {
      const e = element._dispatchChange(evDetail);
      assert.typeOf(e, 'customevent');
    });

    it('Event is not cancelable', () => {
      const e = element._dispatchChange(evDetail);
      assert.isFalse(e.cancelable);
    });

    it('Event is composed', () => {
      const e = element._dispatchChange(evDetail);
      assert.isTrue(e.composed);
    });

    it('Event bubbles', () => {
      const e = element._dispatchChange(evDetail);
      assert.isTrue(e.bubbles);
    });

    it('Event has detail', () => {
      const e = element._dispatchChange(evDetail);
      assert.equal(e.detail.value, evDetail);
    });
  });

  describe('Change selection', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
      element.environments = [{
        name: 'test'
      }];
      element.opened = true;
      await aTimeout();
    });

    it('accepts selection from click', () => {
      const node = element.shadowRoot.querySelectorAll('paper-item')[1];
      node.click();
      assert.equal(element.selected, 'test');
    });
  });

  describe('onenvironment', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onenvironment);
      const f = () => {};
      element.onenvironment = f;
      assert.isTrue(element.onenvironment === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onenvironment = f;
      element._dispatchChange('test');
      element.onenvironment = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onenvironment = f1;
      element.onenvironment = f2;
      element._dispatchChange('test');
      element.onenvironment = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });


  describe('a11y', () => {
    it('is accessible when default', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element, {
        // paper-dropdown-menu issue
        ignoredRules: ['button-name', 'tabindex']
      });
    });

    it('is accessible with values', async () => {
      const element = await basicFixture();
      element.environments = [{
        name: 'test'
      }];
      await assert.isAccessible(element, {
        // paper-dropdown-menu issue
        ignoredRules: ['button-name', 'tabindex']
      });
    });

    it('is accessible when opened', async () => {
      const element = await basicFixture();
      element.environments = [{
        name: 'test'
      }];
      element.opened = true;
      await aTimeout();
      await assert.isAccessible(element, {
        // paper-dropdown-menu issue
        ignoredRules: ['button-name', 'tabindex']
      });
    });
  });
});
