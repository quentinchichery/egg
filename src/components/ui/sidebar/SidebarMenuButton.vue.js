import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue';
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue';
import { computed } from 'vue';
import SidebarMenuButtonChild from './SidebarMenuButtonChild.vue';
import { useSidebar } from './utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
defineOptions({
    inheritAttrs: false,
});
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    as: 'button',
    variant: 'default',
    size: 'default',
});
const { isMobile, state } = useSidebar();
const delegatedProps = computed(() => {
    const { tooltip, ...delegated } = props;
    return delegated;
});
const __VLS_withDefaultsArg = (function (t) { return t; })({
    as: 'button',
    variant: 'default',
    size: 'default',
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
    if (!__VLS_ctx.tooltip) {
        // @ts-ignore
        [SidebarMenuButtonChild, SidebarMenuButtonChild,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(SidebarMenuButtonChild, new SidebarMenuButtonChild({ ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }), }));
        const __VLS_1 = __VLS_0({ ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        var __VLS_5 = {};
        __VLS_nonNullable(__VLS_4.slots).default;
        const __VLS_4 = __VLS_pickFunctionalComponentCtx(SidebarMenuButtonChild, __VLS_1);
    }
    else {
        // @ts-ignore
        [Tooltip, Tooltip,];
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(Tooltip, new Tooltip({}));
        const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
        // @ts-ignore
        [TooltipTrigger, TooltipTrigger,];
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(TooltipTrigger, new TooltipTrigger({ asChild: (true), }));
        const __VLS_12 = __VLS_11({ asChild: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
        // @ts-ignore
        [SidebarMenuButtonChild, SidebarMenuButtonChild,];
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(SidebarMenuButtonChild, new SidebarMenuButtonChild({ ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }), }));
        const __VLS_17 = __VLS_16({ ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
        var __VLS_21 = {};
        __VLS_nonNullable(__VLS_20.slots).default;
        const __VLS_20 = __VLS_pickFunctionalComponentCtx(SidebarMenuButtonChild, __VLS_17);
        __VLS_nonNullable(__VLS_15.slots).default;
        const __VLS_15 = __VLS_pickFunctionalComponentCtx(TooltipTrigger, __VLS_12);
        // @ts-ignore
        [TooltipContent, TooltipContent,];
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(TooltipContent, new TooltipContent({ side: ("right"), align: ("center"), hidden: ((__VLS_ctx.state !== 'collapsed' || __VLS_ctx.isMobile)), }));
        const __VLS_23 = __VLS_22({ side: ("right"), align: ("center"), hidden: ((__VLS_ctx.state !== 'collapsed' || __VLS_ctx.isMobile)), }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        if (typeof __VLS_ctx.tooltip === 'string') {
            (__VLS_ctx.tooltip);
        }
        else {
            const __VLS_27 = ((__VLS_ctx.tooltip));
            // @ts-ignore
            const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({}));
            const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
        }
        __VLS_nonNullable(__VLS_26.slots).default;
        const __VLS_26 = __VLS_pickFunctionalComponentCtx(TooltipContent, __VLS_23);
        __VLS_nonNullable(__VLS_10.slots).default;
        const __VLS_10 = __VLS_pickFunctionalComponentCtx(Tooltip, __VLS_7);
    }
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
            Tooltip: Tooltip,
            TooltipContent: TooltipContent,
            TooltipTrigger: TooltipTrigger,
            SidebarMenuButtonChild: SidebarMenuButtonChild,
            isMobile: isMobile,
            state: state,
            delegatedProps: delegatedProps,
        };
    },
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default {};
;
//# sourceMappingURL=SidebarMenuButton.vue.js.map