import { cn } from '@/lib/utils';
import { ScrollAreaScrollbar, ScrollAreaThumb } from 'radix-vue';
import { computed } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    orientation: 'vertical',
});
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
const __VLS_withDefaultsArg = (function (t) { return t; })({
    orientation: 'vertical',
});
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.ScrollAreaScrollbar;
    /** @type { [typeof __VLS_components.ScrollAreaScrollbar, typeof __VLS_components.ScrollAreaScrollbar, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...(__VLS_ctx.delegatedProps), ...{ class: ((__VLS_ctx.cn('flex touch-none select-none transition-colors', __VLS_ctx.orientation === 'vertical'
                && 'h-full w-2.5 border-l border-l-transparent p-px', __VLS_ctx.orientation === 'horizontal'
                && 'h-2.5 flex-col border-t border-t-transparent p-px', props.class))) }, }));
    const __VLS_2 = __VLS_1({ ...(__VLS_ctx.delegatedProps), ...{ class: ((__VLS_ctx.cn('flex touch-none select-none transition-colors', __VLS_ctx.orientation === 'vertical'
                && 'h-full w-2.5 border-l border-l-transparent p-px', __VLS_ctx.orientation === 'horizontal'
                && 'h-2.5 flex-col border-t border-t-transparent p-px', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.ScrollAreaThumb;
    /** @type { [typeof __VLS_components.ScrollAreaThumb, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("relative flex-1 rounded-full bg-border") }, }));
    const __VLS_8 = __VLS_7({ ...{ class: ("relative flex-1 rounded-full bg-border") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['bg-border'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cn: cn,
            ScrollAreaScrollbar: ScrollAreaScrollbar,
            ScrollAreaThumb: ScrollAreaThumb,
            delegatedProps: delegatedProps,
        };
    },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
;
//# sourceMappingURL=ScrollBar.vue.js.map