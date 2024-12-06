import Sheet from '@/components/ui/sheet/Sheet.vue';
import SheetContent from '@/components/ui/sheet/SheetContent.vue';
import { cn } from '@/lib/utils';
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from './utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
defineOptions({
    inheritAttrs: false,
});
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
});
const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
const __VLS_withDefaultsArg = (function (t) { return t; })({
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
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
    if (__VLS_ctx.collapsible === 'none') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.cn('flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground', props.class))) }, ...(__VLS_ctx.$attrs), });
        var __VLS_0 = {};
    }
    else if (__VLS_ctx.isMobile) {
        // @ts-ignore
        [Sheet, Sheet,];
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(Sheet, new Sheet({ ...{ 'onUpdate:open': {} }, open: ((__VLS_ctx.openMobile)), ...(__VLS_ctx.$attrs), }));
        const __VLS_2 = __VLS_1({ ...{ 'onUpdate:open': {} }, open: ((__VLS_ctx.openMobile)), ...(__VLS_ctx.$attrs), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_6;
        const __VLS_7 = {
            'onUpdate:open': (__VLS_ctx.setOpenMobile)
        };
        let __VLS_3;
        let __VLS_4;
        // @ts-ignore
        [SheetContent, SheetContent,];
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(SheetContent, new SheetContent({ dataSidebar: ("sidebar"), dataMobile: ("true"), ...{ class: ("w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden") }, ...{ style: (({
                    '--sidebar-width': __VLS_ctx.SIDEBAR_WIDTH_MOBILE,
                })) }, }));
        const __VLS_9 = __VLS_8({ dataSidebar: ("sidebar"), dataMobile: ("true"), ...{ class: ("w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden") }, ...{ style: (({
                    '--sidebar-width': __VLS_ctx.SIDEBAR_WIDTH_MOBILE,
                })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex h-full w-full flex-col") }, });
        var __VLS_13 = {};
        __VLS_nonNullable(__VLS_12.slots).default;
        const __VLS_12 = __VLS_pickFunctionalComponentCtx(SheetContent, __VLS_9);
        __VLS_nonNullable(__VLS_5.slots).default;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(Sheet, __VLS_2);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("group peer hidden md:block") }, "data-state": ((__VLS_ctx.state)), "data-collapsible": ((__VLS_ctx.state === 'collapsed' ? __VLS_ctx.collapsible : '')), "data-variant": ((__VLS_ctx.variant)), "data-side": ((__VLS_ctx.side)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.cn('duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear', 'group-data-[collapsible=offcanvas]:w-0', 'group-data-[side=right]:rotate-180', __VLS_ctx.variant === 'floating' || __VLS_ctx.variant === 'inset'
                    ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
                    : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]'))) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.cn('duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex', __VLS_ctx.side === 'left'
                    ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                    : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]', 
                // Adjust the padding for floating and inset variants.
                __VLS_ctx.variant === 'floating' || __VLS_ctx.variant === 'inset'
                    ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
                    : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l', props.class))) }, ...(__VLS_ctx.$attrs), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ "data-sidebar": ("sidebar"), ...{ class: ("flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow") }, });
        var __VLS_14 = {};
    }
    __VLS_styleScopedClasses['w-[--sidebar-width]'];
    __VLS_styleScopedClasses['bg-sidebar'];
    __VLS_styleScopedClasses['p-0'];
    __VLS_styleScopedClasses['text-sidebar-foreground'];
    __VLS_styleScopedClasses['[&>button]:hidden'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['group'];
    __VLS_styleScopedClasses['peer'];
    __VLS_styleScopedClasses['hidden'];
    __VLS_styleScopedClasses['md:block'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['bg-sidebar'];
    __VLS_styleScopedClasses['group-data-[variant=floating]:rounded-lg'];
    __VLS_styleScopedClasses['group-data-[variant=floating]:border'];
    __VLS_styleScopedClasses['group-data-[variant=floating]:border-sidebar-border'];
    __VLS_styleScopedClasses['group-data-[variant=floating]:shadow'];
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
            Sheet: Sheet,
            SheetContent: SheetContent,
            cn: cn,
            SIDEBAR_WIDTH_MOBILE: SIDEBAR_WIDTH_MOBILE,
            isMobile: isMobile,
            state: state,
            openMobile: openMobile,
            setOpenMobile: setOpenMobile,
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
//# sourceMappingURL=Sidebar.vue.js.map