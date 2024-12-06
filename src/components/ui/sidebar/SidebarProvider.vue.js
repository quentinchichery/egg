import { cn } from '@/lib/utils';
import { useEventListener, useVModel } from '@vueuse/core';
import { TooltipProvider } from 'radix-vue';
import { computed, ref } from 'vue';
import { provideSidebarContext, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from './utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    defaultOpen: true,
    open: undefined,
});
const emits = defineEmits();
const isMobile = ref(false); // useIsMobile()
const openMobile = ref(false);
const open = useVModel(props, 'open', emits, {
    defaultValue: props.defaultOpen ?? false,
    passive: (props.open === undefined),
});
function setOpen(value) {
    open.value = value; // emits('update:open', value)
    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
}
function setOpenMobile(value) {
    openMobile.value = value;
}
// Helper to toggle the sidebar.
function toggleSidebar() {
    return isMobile.value ? setOpenMobile(!open.value) : setOpen(!open.value);
}
useEventListener('keydown', (event) => {
    if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
    }
});
// We add a state so that we can do data-state="expanded" or "collapsed".
// This makes it easier to style the sidebar with Tailwind classes.
const state = computed(() => open.value ? 'expanded' : 'collapsed');
provideSidebarContext({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
});
const __VLS_withDefaultsArg = (function (t) { return t; })({
    defaultOpen: true,
    open: undefined,
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    __typeEmits: {},
});
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.TooltipProvider;
    /** @type { [typeof __VLS_components.TooltipProvider, typeof __VLS_components.TooltipProvider, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ delayDuration: ((0)), }));
    const __VLS_2 = __VLS_1({ delayDuration: ((0)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: (({
                '--sidebar-width': __VLS_ctx.SIDEBAR_WIDTH,
                '--sidebar-width-icon': __VLS_ctx.SIDEBAR_WIDTH_ICON,
            })) }, ...{ class: ((__VLS_ctx.cn('group/sidebar-wrapper flex min-h-svh w-full text-sidebar-foreground has-[[data-variant=inset]]:bg-sidebar', props.class))) }, });
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
            TooltipProvider: TooltipProvider,
            SIDEBAR_WIDTH: SIDEBAR_WIDTH,
            SIDEBAR_WIDTH_ICON: SIDEBAR_WIDTH_ICON,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
;
//# sourceMappingURL=SidebarProvider.vue.js.map