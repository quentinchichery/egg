import { ErrorMessage } from 'vee-validate';
import { toValue } from 'vue';
import { useFormField } from './useFormField';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { name, formMessageId } = useFormField();
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.ErrorMessage;
    /** @type { [typeof __VLS_components.ErrorMessage, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ id: ((__VLS_ctx.formMessageId)), as: ("p"), name: ((__VLS_ctx.toValue(__VLS_ctx.name))), ...{ class: ("text-sm font-medium text-destructive") }, }));
    const __VLS_2 = __VLS_1({ id: ((__VLS_ctx.formMessageId)), as: ("p"), name: ((__VLS_ctx.toValue(__VLS_ctx.name))), ...{ class: ("text-sm font-medium text-destructive") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-destructive'];
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
            ErrorMessage: ErrorMessage,
            toValue: toValue,
            name: name,
            formMessageId: formMessageId,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=FormMessage.vue.js.map