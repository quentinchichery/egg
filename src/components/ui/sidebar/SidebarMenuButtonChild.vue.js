import { cn } from '@/lib/utils';
import { Primitive } from 'radix-vue';
import { sidebarMenuButtonVariants } from '.';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    as: 'button',
    variant: 'default',
    size: 'default',
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Primitive;
    /** @type { [typeof __VLS_components.Primitive, typeof __VLS_components.Primitive, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ dataSidebar: ("menu-button"), dataSize: ((__VLS_ctx.size)), dataActive: ((__VLS_ctx.isActive)), ...{ class: ((__VLS_ctx.cn(__VLS_ctx.sidebarMenuButtonVariants({ variant: __VLS_ctx.variant, size: __VLS_ctx.size }), props.class))) }, as: ((__VLS_ctx.as)), asChild: ((__VLS_ctx.asChild)), ...(__VLS_ctx.$attrs), }));
    const __VLS_2 = __VLS_1({ dataSidebar: ("menu-button"), dataSize: ((__VLS_ctx.size)), dataActive: ((__VLS_ctx.isActive)), ...{ class: ((__VLS_ctx.cn(__VLS_ctx.sidebarMenuButtonVariants({ variant: __VLS_ctx.variant, size: __VLS_ctx.size }), props.class))) }, as: ((__VLS_ctx.as)), asChild: ((__VLS_ctx.asChild)), ...(__VLS_ctx.$attrs), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
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
            Primitive: Primitive,
            sidebarMenuButtonVariants: sidebarMenuButtonVariants,
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
//# sourceMappingURL=SidebarMenuButtonChild.vue.js.map