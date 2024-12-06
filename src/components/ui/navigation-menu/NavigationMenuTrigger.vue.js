import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-vue-next';
import { NavigationMenuTrigger, useForwardProps, } from 'radix-vue';
import { computed } from 'vue';
import { navigationMenuTriggerStyle } from '.';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
const forwardedProps = useForwardProps(delegatedProps);
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NavigationMenuTrigger;
    /** @type { [typeof __VLS_components.NavigationMenuTrigger, typeof __VLS_components.NavigationMenuTrigger, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...(__VLS_ctx.forwardedProps), ...{ class: ((__VLS_ctx.cn(__VLS_ctx.navigationMenuTriggerStyle(), 'group', props.class))) }, }));
    const __VLS_2 = __VLS_1({ ...(__VLS_ctx.forwardedProps), ...{ class: ((__VLS_ctx.cn(__VLS_ctx.navigationMenuTriggerStyle(), 'group', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.ChevronDown;
    /** @type { [typeof __VLS_components.ChevronDown, ] } */
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ ...{ class: ("relative top-px ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180") }, "aria-hidden": ("true"), }));
    const __VLS_9 = __VLS_8({ ...{ class: ("relative top-px ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180") }, "aria-hidden": ("true"), }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['top-px'];
    __VLS_styleScopedClasses['ml-1'];
    __VLS_styleScopedClasses['h-3'];
    __VLS_styleScopedClasses['w-3'];
    __VLS_styleScopedClasses['transition'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['group-data-[state=open]:rotate-180'];
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
            NavigationMenuTrigger: NavigationMenuTrigger,
            navigationMenuTriggerStyle: navigationMenuTriggerStyle,
            forwardedProps: forwardedProps,
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
//# sourceMappingURL=NavigationMenuTrigger.vue.js.map