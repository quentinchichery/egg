import { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { ToggleGroupItem, useForwardProps } from 'radix-vue';
import { computed, inject } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const context = inject('toggleGroup');
const delegatedProps = computed(() => {
    const { class: _, variant, size, ...delegated } = props;
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.ToggleGroupItem;
    /** @type { [typeof __VLS_components.ToggleGroupItem, typeof __VLS_components.ToggleGroupItem, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...(__VLS_ctx.forwardedProps), ...{ class: ((__VLS_ctx.cn(__VLS_ctx.toggleVariants({
                variant: __VLS_ctx.context?.variant || __VLS_ctx.variant,
                size: __VLS_ctx.context?.size || __VLS_ctx.size,
            }), props.class))) }, }));
    const __VLS_2 = __VLS_1({ ...(__VLS_ctx.forwardedProps), ...{ class: ((__VLS_ctx.cn(__VLS_ctx.toggleVariants({
                variant: __VLS_ctx.context?.variant || __VLS_ctx.variant,
                size: __VLS_ctx.context?.size || __VLS_ctx.size,
            }), props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
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
            toggleVariants: toggleVariants,
            cn: cn,
            ToggleGroupItem: ToggleGroupItem,
            context: context,
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
//# sourceMappingURL=ToggleGroupItem.vue.js.map