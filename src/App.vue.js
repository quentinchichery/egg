import FilterComponent from '@/components/FilterComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import restaurantService from '@/api/restaurantService';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle, } from '@/components/ui/navigation-menu';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Initialize reactive data
const restaurants = ref(restaurantService.localFetchRestaurants());
// Update function to handle filtering in FilterComponent
function updatedRestaurants(newData) {
    restaurants.value = newData;
}
const isModalOpen = ref(false);
const formData = ref(null);
const openModal = () => {
    isModalOpen.value = true;
};
const isFilterOpen = ref(false);
const isMobile = ref(false);
function openFilter() {
    isFilterOpen.value = true;
}
function closeFilter() {
    isFilterOpen.value = false;
}
function checkScreenSize() {
    isMobile.value = window.innerWidth <= 768; // Adjust the breakpoint as needed
}
onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("app"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
    // @ts-ignore
    [Header,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Header, new Header({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("navigation"), });
    const __VLS_5 = __VLS_resolvedLocalAndGlobalComponents.NavigationMenu;
    /** @type { [typeof __VLS_components.NavigationMenu, typeof __VLS_components.NavigationMenu, ] } */
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const __VLS_11 = __VLS_resolvedLocalAndGlobalComponents.NavigationMenuList;
    /** @type { [typeof __VLS_components.NavigationMenuList, typeof __VLS_components.NavigationMenuList, ] } */
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
    const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
    const __VLS_17 = __VLS_resolvedLocalAndGlobalComponents.NavigationMenuItem;
    /** @type { [typeof __VLS_components.NavigationMenuItem, typeof __VLS_components.NavigationMenuItem, ] } */
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
    const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
    const __VLS_23 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({ to: ("/grid"), }));
    const __VLS_25 = __VLS_24({ to: ("/grid"), }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    const __VLS_29 = __VLS_resolvedLocalAndGlobalComponents.NavigationMenuLink;
    /** @type { [typeof __VLS_components.NavigationMenuLink, typeof __VLS_components.NavigationMenuLink, ] } */
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({ ...{ class: ((__VLS_ctx.navigationMenuTriggerStyle())) }, }));
    const __VLS_31 = __VLS_30({ ...{ class: ((__VLS_ctx.navigationMenuTriggerStyle())) }, }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    __VLS_nonNullable(__VLS_34.slots).default;
    const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_29, __VLS_31);
    __VLS_nonNullable(__VLS_28.slots).default;
    const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_23, __VLS_25);
    __VLS_nonNullable(__VLS_22.slots).default;
    const __VLS_22 = __VLS_pickFunctionalComponentCtx(__VLS_17, __VLS_19);
    const __VLS_35 = __VLS_resolvedLocalAndGlobalComponents.NavigationMenuItem;
    /** @type { [typeof __VLS_components.NavigationMenuItem, typeof __VLS_components.NavigationMenuItem, ] } */
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({}));
    const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
    const __VLS_41 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({ to: ("/map"), }));
    const __VLS_43 = __VLS_42({ to: ("/map"), }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    const __VLS_47 = __VLS_resolvedLocalAndGlobalComponents.NavigationMenuLink;
    /** @type { [typeof __VLS_components.NavigationMenuLink, typeof __VLS_components.NavigationMenuLink, ] } */
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({ ...{ class: ((__VLS_ctx.navigationMenuTriggerStyle())) }, }));
    const __VLS_49 = __VLS_48({ ...{ class: ((__VLS_ctx.navigationMenuTriggerStyle())) }, }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    __VLS_nonNullable(__VLS_52.slots).default;
    const __VLS_52 = __VLS_pickFunctionalComponentCtx(__VLS_47, __VLS_49);
    __VLS_nonNullable(__VLS_46.slots).default;
    const __VLS_46 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43);
    __VLS_nonNullable(__VLS_40.slots).default;
    const __VLS_40 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37);
    __VLS_nonNullable(__VLS_16.slots).default;
    const __VLS_16 = __VLS_pickFunctionalComponentCtx(__VLS_11, __VLS_13);
    __VLS_nonNullable(__VLS_10.slots).default;
    const __VLS_10 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("app-container") }, });
    if (__VLS_ctx.isMobile) {
        // @ts-ignore
        [ModalComponent, ModalComponent,];
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent(ModalComponent, new ModalComponent({ ...{ 'onClose': {} }, isOpen: ((__VLS_ctx.isFilterOpen)), }));
        const __VLS_54 = __VLS_53({ ...{ 'onClose': {} }, isOpen: ((__VLS_ctx.isFilterOpen)), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
        let __VLS_58;
        const __VLS_59 = {
            onClose: (__VLS_ctx.closeFilter)
        };
        let __VLS_55;
        let __VLS_56;
        // @ts-ignore
        [FilterComponent,];
        // @ts-ignore
        const __VLS_60 = __VLS_asFunctionalComponent(FilterComponent, new FilterComponent({ ...{ 'onFilteredRestaurants': {} }, }));
        const __VLS_61 = __VLS_60({ ...{ 'onFilteredRestaurants': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_60));
        let __VLS_65;
        const __VLS_66 = {
            onFilteredRestaurants: (__VLS_ctx.updatedRestaurants)
        };
        let __VLS_62;
        let __VLS_63;
        const __VLS_64 = __VLS_pickFunctionalComponentCtx(FilterComponent, __VLS_61);
        __VLS_nonNullable(__VLS_57.slots).default;
        const __VLS_57 = __VLS_pickFunctionalComponentCtx(ModalComponent, __VLS_54);
    }
    if (!__VLS_ctx.isMobile) {
        // @ts-ignore
        [SidebarComponent, SidebarComponent,];
        // @ts-ignore
        const __VLS_67 = __VLS_asFunctionalComponent(SidebarComponent, new SidebarComponent({ ...{ class: ("sidebar") }, }));
        const __VLS_68 = __VLS_67({ ...{ class: ("sidebar") }, }, ...__VLS_functionalComponentArgsRest(__VLS_67));
        // @ts-ignore
        [FilterComponent,];
        // @ts-ignore
        const __VLS_72 = __VLS_asFunctionalComponent(FilterComponent, new FilterComponent({ ...{ 'onFilteredRestaurants': {} }, }));
        const __VLS_73 = __VLS_72({ ...{ 'onFilteredRestaurants': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_72));
        let __VLS_77;
        const __VLS_78 = {
            onFilteredRestaurants: (__VLS_ctx.updatedRestaurants)
        };
        let __VLS_74;
        let __VLS_75;
        const __VLS_76 = __VLS_pickFunctionalComponentCtx(FilterComponent, __VLS_73);
        __VLS_nonNullable(__VLS_71.slots).default;
        const __VLS_71 = __VLS_pickFunctionalComponentCtx(SidebarComponent, __VLS_68);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("main-content") }, });
    const __VLS_79 = __VLS_resolvedLocalAndGlobalComponents.RouterView;
    /** @type { [typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ] } */
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({ ...{ style: ({}) }, restaurants: ((__VLS_ctx.restaurants)), }));
    const __VLS_81 = __VLS_80({ ...{ style: ({}) }, restaurants: ((__VLS_ctx.restaurants)), }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    if (__VLS_ctx.isMobile) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.openFilter) }, ...{ class: ("filter-button") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({});
    // @ts-ignore
    [Footer,];
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent(Footer, new Footer({}));
    const __VLS_86 = __VLS_85({}, ...__VLS_functionalComponentArgsRest(__VLS_85));
    __VLS_styleScopedClasses['app-container'];
    __VLS_styleScopedClasses['sidebar'];
    __VLS_styleScopedClasses['main-content'];
    __VLS_styleScopedClasses['filter-button'];
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
            FilterComponent: FilterComponent,
            ModalComponent: ModalComponent,
            SidebarComponent: SidebarComponent,
            Header: Header,
            Footer: Footer,
            NavigationMenu: NavigationMenu,
            NavigationMenuItem: NavigationMenuItem,
            NavigationMenuLink: NavigationMenuLink,
            NavigationMenuList: NavigationMenuList,
            navigationMenuTriggerStyle: navigationMenuTriggerStyle,
            restaurants: restaurants,
            updatedRestaurants: updatedRestaurants,
            isFilterOpen: isFilterOpen,
            isMobile: isMobile,
            openFilter: openFilter,
            closeFilter: closeFilter,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=App.vue.js.map