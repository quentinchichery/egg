import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import { cn } from '@/lib/utils';
import { computed } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const width = computed(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ "data-sidebar": ("menu-skeleton"), ...{ class: ((__VLS_ctx.cn('rounded-md h-8 flex gap-2 px-2 items-center', props.class))) }, });
    if (__VLS_ctx.showIcon) {
        // @ts-ignore
        [Skeleton,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(Skeleton, new Skeleton({ ...{ class: ("size-4 rounded-md") }, dataSidebar: ("menu-skeleton-icon"), }));
        const __VLS_1 = __VLS_0({ ...{ class: ("size-4 rounded-md") }, dataSidebar: ("menu-skeleton-icon"), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
    // @ts-ignore
    [Skeleton,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(Skeleton, new Skeleton({ ...{ class: ("h-4 flex-1 max-w-[--skeleton-width]") }, dataSidebar: ("menu-skeleton-text"), ...{ style: (({ '--skeleton-width': __VLS_ctx.width })) }, }));
    const __VLS_6 = __VLS_5({ ...{ class: ("h-4 flex-1 max-w-[--skeleton-width]") }, dataSidebar: ("menu-skeleton-text"), ...{ style: (({ '--skeleton-width': __VLS_ctx.width })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_styleScopedClasses['size-4'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['max-w-[--skeleton-width]'];
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
            Skeleton: Skeleton,
            cn: cn,
            width: width,
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
//# sourceMappingURL=SidebarMenuSkeleton.vue.js.map