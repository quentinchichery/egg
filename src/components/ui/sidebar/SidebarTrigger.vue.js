import Button from '@/components/ui/button/Button.vue';
import { cn } from '@/lib/utils';
import { PanelLeft } from 'lucide-vue-next';
import { useSidebar } from './utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const { toggleSidebar } = useSidebar();
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
    // @ts-ignore
    [Button, Button,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Button, new Button({ ...{ 'onClick': {} }, dataSidebar: ("trigger"), variant: ("ghost"), size: ("icon"), ...{ class: ((__VLS_ctx.cn('h-7 w-7', props.class))) }, }));
    const __VLS_1 = __VLS_0({ ...{ 'onClick': {} }, dataSidebar: ("trigger"), variant: ("ghost"), size: ("icon"), ...{ class: ((__VLS_ctx.cn('h-7 w-7', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_5;
    const __VLS_6 = {
        onClick: (__VLS_ctx.toggleSidebar)
    };
    let __VLS_2;
    let __VLS_3;
    const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.PanelLeft;
    /** @type { [typeof __VLS_components.PanelLeft, ] } */
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("sr-only") }, });
    __VLS_nonNullable(__VLS_4.slots).default;
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(Button, __VLS_1);
    __VLS_styleScopedClasses['sr-only'];
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
            Button: Button,
            cn: cn,
            PanelLeft: PanelLeft,
            toggleSidebar: toggleSidebar,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
;
//# sourceMappingURL=SidebarTrigger.vue.js.map