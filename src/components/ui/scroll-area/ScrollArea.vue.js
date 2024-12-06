import { cn } from '@/lib/utils';
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport, } from 'radix-vue';
import { computed } from 'vue';
import ScrollBar from './ScrollBar.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.ScrollAreaRoot;
    /** @type { [typeof __VLS_components.ScrollAreaRoot, typeof __VLS_components.ScrollAreaRoot, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...(__VLS_ctx.delegatedProps), ...{ class: ((__VLS_ctx.cn('relative overflow-hidden', props.class))) }, }));
    const __VLS_2 = __VLS_1({ ...(__VLS_ctx.delegatedProps), ...{ class: ((__VLS_ctx.cn('relative overflow-hidden', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.ScrollAreaViewport;
    /** @type { [typeof __VLS_components.ScrollAreaViewport, typeof __VLS_components.ScrollAreaViewport, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("h-full w-full rounded-[inherit]") }, }));
    const __VLS_8 = __VLS_7({ ...{ class: ("h-full w-full rounded-[inherit]") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    var __VLS_12 = {};
    __VLS_nonNullable(__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    // @ts-ignore
    [ScrollBar,];
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(ScrollBar, new ScrollBar({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.ScrollAreaCorner;
    /** @type { [typeof __VLS_components.ScrollAreaCorner, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['rounded-[inherit]'];
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
            ScrollAreaCorner: ScrollAreaCorner,
            ScrollAreaRoot: ScrollAreaRoot,
            ScrollAreaViewport: ScrollAreaViewport,
            ScrollBar: ScrollBar,
            delegatedProps: delegatedProps,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
;
//# sourceMappingURL=ScrollArea.vue.js.map