/**
 * 该文件由脚本自动生成，如需修改请联系 PMC
 * This file generated by scripts of tdesign-api. `npm run api:docs AutoComplete VueNext(PC) vitest,finalProject`
 * If you need to modify this file, contact PMC first please.
 */
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { AutoComplete } from '..';
import { getNormalAutoCompleteMount } from './mount';

describe('AutoComplete Component', () => {
  it(`props.autofocus is equal to false`, () => {
    const wrapper = mount(<AutoComplete autofocus={false}></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('autofocus')).toBeUndefined();
  });
  it(`props.autofocus is equal to true`, () => {
    const wrapper = mount(<AutoComplete autofocus={true}></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('autofocus')).toBeDefined();
  });

  it('props.clearable: show clear icon on mouse enter', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete, { value: 'Default Keyword', clearable: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
  });
  it('props.clearable: expect trigger clear and change events after clear icon has been clicked', async () => {
    const onClearFn1 = vi.fn();
    const onChangeFn1 = vi.fn();
    const wrapper = getNormalAutoCompleteMount(
      AutoComplete,
      { value: 'Default Keyword', clearable: true },
      { onClear: onClearFn1, onChange: onChangeFn1 },
    );
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
    wrapper.find('.t-input__suffix-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onClearFn1).toHaveBeenCalled();
    expect(onClearFn1.mock.calls[0][0].e.stopPropagation).toBeTruthy();
    expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn1).toHaveBeenCalled();
    expect(onChangeFn1.mock.calls[0][0]).toBe('');
    expect(onChangeFn1.mock.calls[0][1].e.stopPropagation).toBeTruthy();
    expect(onChangeFn1.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.default works fine', () => {
    const wrapper = mount(<AutoComplete default={() => <span class="custom-node">TNode</span>}></AutoComplete>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ default: () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.disabled works fine', () => {
    // disabled default value is
    const wrapper1 = mount(<AutoComplete></AutoComplete>).find('.t-input');
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<AutoComplete disabled={true}></AutoComplete>).find('.t-input');
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    // disabled = false
    const wrapper3 = mount(<AutoComplete disabled={false}></AutoComplete>).find('.t-input');
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
  });

  it('props.filter works fine', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete, {
      filter: (filterWords, option) => option.text.includes('Second'),
    });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(1);
    // remove nodes from document to avoid influencing following test cases
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it('props.filterable works fine', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete, { value: 'First', filterable: true });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(1);
    // remove nodes from document to avoid influencing following test cases
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it('props.highlightKeyword works fine', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete, { value: 'Second', highlightKeyword: true });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(1);
    // remove nodes from document to avoid influencing following test cases
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it('props.options: option.label could be defined to any element', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });
  it('props.options: 3 options should exist', async () => {
    const wrapper = getNormalAutoCompleteMount(AutoComplete);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const tSelectOptionDom = document.querySelectorAll('.t-select-option');
    expect(tSelectOptionDom.length).toBe(3);
    // remove nodes from document to avoid influencing following test cases
    tSelectOptionDom.forEach((node) => node.remove());
    document.querySelectorAll('.t-popup').forEach((node) => node.remove());
  });

  it('props.panelBottomContent works fine', async () => {
    const wrapper = mount(
      <AutoComplete panelBottomContent={() => <span class="custom-node">TNode</span>}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });

  it('slots.panelBottomContent works fine', async () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ panelBottomContent: () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });
  it('slots.panel-bottom-content works fine', async () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ 'panel-bottom-content': () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });

  it('props.panelTopContent works fine', async () => {
    const wrapper = mount(<AutoComplete panelTopContent={() => <span class="custom-node">TNode</span>}></AutoComplete>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });

  it('slots.panelTopContent works fine', async () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ panelTopContent: () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });
  it('slots.panel-top-content works fine', async () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ 'panel-top-content': () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    customNodeDom.remove();
    const tPopupDom = document.querySelector('.t-popup');
    expect(tPopupDom).toBeDefined();
    // remove node in document to avoid influencing following test cases
    tPopupDom.remove();
  });

  it(`props.placeholder is equal to 'type keyword to search'`, () => {
    const wrapper = mount(<AutoComplete placeholder={'type keyword to search'}></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('placeholder')).toBe('type keyword to search');
  });

  it('props.readonly works fine', () => {
    // readonly default value is
    const wrapper1 = getNormalAutoCompleteMount(AutoComplete).find('.t-input');
    expect(wrapper1.classes('t-is-readonly')).toBeFalsy();
    // readonly = true
    const wrapper2 = getNormalAutoCompleteMount(AutoComplete, { readonly: true }).find('.t-input');
    expect(wrapper2.classes('t-is-readonly')).toBeTruthy();
    // readonly = false
    const wrapper3 = getNormalAutoCompleteMount(AutoComplete, { readonly: false }).find('.t-input');
    expect(wrapper3.classes('t-is-readonly')).toBeFalsy();
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = getNormalAutoCompleteMount(AutoComplete, { size: item }).find('.t-input');
      if (typeof sizeClassNameList[index] === 'string') {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  ['default', 'success', 'warning', 'error'].forEach((item) => {
    it(`props.status is equal to ${item}`, () => {
      const wrapper = getNormalAutoCompleteMount(AutoComplete, { status: item }).find('.t-input');
      expect(wrapper.classes(`t-is-${item}`)).toBeTruthy();
    });
  });

  it('props.tips is equal this is a tip', () => {
    const wrapper = mount(<AutoComplete tips={'this is a tip'}></AutoComplete>);
    expect(wrapper.find('.t-input__tips').exists()).toBeTruthy();
  });

  it('props.triggerElement works fine', () => {
    const wrapper = mount(<AutoComplete triggerElement={() => <span class="custom-node">TNode</span>}></AutoComplete>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.triggerElement works fine', () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ triggerElement: () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.trigger-element works fine', () => {
    const wrapper = mount(
      <AutoComplete v-slots={{ 'trigger-element': () => <span class="custom-node">TNode</span> }}></AutoComplete>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it(`props.value is equal to 'DefaultKeyword'`, () => {
    const wrapper = mount(<AutoComplete value={'DefaultKeyword'}></AutoComplete>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.element.value).toBe('DefaultKeyword');
  });

  it('events.blur works fine', async () => {
    const onFocusFn = vi.fn();
    const onBlurFn1 = vi.fn();
    const wrapper = getNormalAutoCompleteMount(AutoComplete, {}, { onFocus: onFocusFn, onBlur: onBlurFn1 });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).toHaveBeenCalled();
    expect(onFocusFn.mock.calls[0][0].e.type).toBe('focus');
    wrapper.find('input').trigger('blur');
    await wrapper.vm.$nextTick();
    expect(onBlurFn1).toHaveBeenCalled();
    expect(onBlurFn1.mock.calls[0][0].e.type).toBe('blur');
  });

  it('events.enter works fine', async () => {
    const onEnterFn1 = vi.fn();
    const wrapper = getNormalAutoCompleteMount(AutoComplete, {}, { onEnter: onEnterFn1 });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('keydown.enter');
    await wrapper.vm.$nextTick();
    expect(onEnterFn1).toHaveBeenCalled();
    expect(onEnterFn1.mock.calls[0][0].e.type).toBe('keydown');
    expect(/Enter/i.test(onEnterFn1.mock.calls[0][0].e.key)).toBeTruthy();
  });

  it('events.focus works fine', async () => {
    const onFocusFn = vi.fn();
    const wrapper = getNormalAutoCompleteMount(AutoComplete, {}, { onFocus: onFocusFn });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-is-focused').exists()).toBeTruthy();
    expect(onFocusFn).toHaveBeenCalled();
    expect(onFocusFn.mock.calls[0][0].e.type).toBe('focus');
  });
});
