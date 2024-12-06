import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-vue-next';
import { AccordionHeader, AccordionTrigger, } from 'radix-vue';
import { computed } from 'vue';
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.AccordionHeader;
    /** @type { [typeof __VLS_components.AccordionHeader, typeof __VLS_components.AccordionHeader, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ("flex") }, }));
    const __VLS_2 = __VLS_1({ ...{ class: ("flex") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.AccordionTrigger;
    /** @type { [typeof __VLS_components.AccordionTrigger, typeof __VLS_components.AccordionTrigger, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...(__VLS_ctx.delegatedProps), ...{ class: ((__VLS_ctx.cn('flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180', props.class))) }, }));
    const __VLS_8 = __VLS_7({ ...(__VLS_ctx.delegatedProps), ...{ class: ((__VLS_ctx.cn('flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    var __VLS_12 = {};
    var __VLS_13 = {};
    const __VLS_14 = __VLS_resolvedLocalAndGlobalComponents.ChevronDown;
    /** @type { [typeof __VLS_components.ChevronDown, ] } */
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ ...{ class: ("h-4 w-4 shrink-0 transition-transform duration-200") }, }));
    const __VLS_16 = __VLS_15({ ...{ class: ("h-4 w-4 shrink-0 transition-transform duration-200") }, }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    __VLS_nonNullable(__VLS_11.slots).default;
    __VLS_nonNullable(__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['transition-transform'];
    __VLS_styleScopedClasses['duration-200'];
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
            ChevronDown: ChevronDown,
            AccordionHeader: AccordionHeader,
            AccordionTrigger: AccordionTrigger,
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
//# sourceMappingURL=AccordionTrigger.vue.js.map