import { cn } from '@/lib/utils';
import { Primitive } from 'radix-vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    as: 'a',
    size: 'md',
});
const __VLS_withDefaultsArg = (function (t) { return t; })({
    as: 'a',
    size: 'md',
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
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ dataSidebar: ("menu-sub-button"), as: ((__VLS_ctx.as)), asChild: ((__VLS_ctx.asChild)), dataSize: ((__VLS_ctx.size)), dataActive: ((__VLS_ctx.isActive)), ...{ class: ((__VLS_ctx.cn('flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground', 'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground', __VLS_ctx.size === 'sm' && 'text-xs', __VLS_ctx.size === 'md' && 'text-sm', 'group-data-[collapsible=icon]:hidden', props.class))) }, }));
    const __VLS_2 = __VLS_1({ dataSidebar: ("menu-sub-button"), as: ((__VLS_ctx.as)), asChild: ((__VLS_ctx.asChild)), dataSize: ((__VLS_ctx.size)), dataActive: ((__VLS_ctx.isActive)), ...{ class: ((__VLS_ctx.cn('flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground', 'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground', __VLS_ctx.size === 'sm' && 'text-xs', __VLS_ctx.size === 'md' && 'text-sm', 'group-data-[collapsible=icon]:hidden', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
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
//# sourceMappingURL=SidebarMenuSubButton.vue.js.map