import { Slot } from 'radix-vue';
import { useFormField } from './useFormField';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Slot;
    /** @type { [typeof __VLS_components.Slot, typeof __VLS_components.Slot, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ id: ((__VLS_ctx.formItemId)), "aria-describedby": ((!__VLS_ctx.error ? `${__VLS_ctx.formDescriptionId}` : `${__VLS_ctx.formDescriptionId} ${__VLS_ctx.formMessageId}`)), "aria-invalid": ((!!__VLS_ctx.error)), }));
    const __VLS_2 = __VLS_1({ id: ((__VLS_ctx.formItemId)), "aria-describedby": ((!__VLS_ctx.error ? `${__VLS_ctx.formDescriptionId}` : `${__VLS_ctx.formDescriptionId} ${__VLS_ctx.formMessageId}`)), "aria-invalid": ((!!__VLS_ctx.error)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
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
            Slot: Slot,
            error: error,
            formItemId: formItemId,
            formDescriptionId: formDescriptionId,
            formMessageId: formMessageId,
        };
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default {};
;
//# sourceMappingURL=FormControl.vue.js.map