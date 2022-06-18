import { defineComponent, VNode, inject, ref, computed, getCurrentInstance, onMounted, onBeforeUpdate } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';

import props from './breadcrumb-item-props';
import Tooltip from '../tooltip/index';
import { isNodeOverflow } from '../utils/dom';
import { usePrefixClass } from '../hooks/useConfig';
import { TdBreadcrumbItemProps } from './type';

interface LocalTBreadcrumb {
  separator: (() => void) | string;
  theme: string;
  slots: {
    separator: VNode | string;
  };
  maxItemWidth: string;
}

const localTBreadcrumbOrigin: LocalTBreadcrumb = {
  separator: '',
  theme: 'light',
  slots: { separator: '' },
  maxItemWidth: undefined,
};

export default defineComponent({
  name: 'TBreadcrumbItem',
  props,
  setup(props: TdBreadcrumbItemProps, { slots }) {
    const breadcrumbText = ref<HTMLElement>();
    const localTBreadcrumb = inject('tBreadcrumb', localTBreadcrumbOrigin);
    const themeClassName = ref(localTBreadcrumb?.theme);
    const isCutOff = ref(false);
    const COMPONENT_NAME = usePrefixClass('breadcrumb__item');
    const separatorClass = usePrefixClass('breadcrumb__separator');
    const disableClass = usePrefixClass('is-disabled');
    const linkClass = usePrefixClass('link');
    const maxLengthClass = usePrefixClass('breadcrumb__inner');
    const textFlowClass = usePrefixClass('breadcrumb--text-overflow');
    const maxWithStyle = computed(() => {
      const maxItemWidth = localTBreadcrumb?.maxItemWidth;
      const maxWith: string = props.maxWidth || maxItemWidth || '120';
      return { maxWidth: `${maxWith}px` };
    });

    onMounted(() => {
      isCutOff.value = isNodeOverflow(breadcrumbText.value);
    });
    onBeforeUpdate(() => {
      isCutOff.value = isNodeOverflow(breadcrumbText.value);
    });

    const separatorPropContent = localTBreadcrumb?.separator;
    const separatorSlot = localTBreadcrumb?.slots?.separator;
    const separatorContent = separatorPropContent || separatorSlot || (
      <ChevronRightIcon {...{ color: 'rgba(0,0,0,.3)' }} />
    );

    const { proxy } = getCurrentInstance();
    const bindEvent = (e: MouseEvent) => {
      if (!props.disabled) {
        e.preventDefault();
        if (props.href) {
          window.location.href = props.href;
        }
        const router = props.router || proxy.$root.$router;
        if (props.to && router) {
          props.replace ? router.replace(props.to) : router.push(props.to);
        }
      }
    };

    return () => {
      const itemClass = [COMPONENT_NAME.value, themeClassName.value];
      const textClass = [textFlowClass.value];

      if (props.disabled) {
        textClass.push(disableClass.value);
      }

      const textContent = (
        <span ref={breadcrumbText} {...{ class: maxLengthClass.value, style: maxWithStyle.value }}>
          {slots.default()}
        </span>
      );
      let itemContent = <span class={textClass}>{textContent}</span>;

      if ((props.href || props.to) && !props.disabled) {
        textClass.push(linkClass.value);
        itemContent = (
          <a class={textClass} href={props.href} target={props.target} onClick={bindEvent}>
            {textContent}
          </a>
        );
      }
      return (
        <div class={itemClass}>
          {isCutOff.value ? <Tooltip content={() => slots?.default()}>{itemContent}</Tooltip> : itemContent}
          <span class={separatorClass.value}>
            {typeof separatorContent === 'function' ? separatorContent() : separatorContent}
          </span>
        </div>
      );
    };
  },
});
