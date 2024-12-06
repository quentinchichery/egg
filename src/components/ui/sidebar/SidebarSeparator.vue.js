import Separator from '@/components/ui/separator/Separator.vue';
import { cn } from '@/lib/utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
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
    [Separator, Separator,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Separator, new Separator({ dataSidebar: ("separator"), ...{ class: ((__VLS_ctx.cn('mx-2 w-auto bg-sidebar-border', props.class))) }, }));
    const __VLS_1 = __VLS_0({ dataSidebar: ("separator"), ...{ class: ((__VLS_ctx.cn('mx-2 w-auto bg-sidebar-border', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    var __VLS_5 = {};
    __VLS_nonNullable(__VLS_4.slots).default;
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(Separator, __VLS_1);
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
            Separator: Separator,
            cn: cn,
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
//# sourceMappingURL=SidebarSeparator.vue.js.map