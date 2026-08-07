
<template>
  <div id="app">
    <header>
      <Header/>
      <nav v-if="route.meta.hideNav !== true" id="navigation" class="flex space-x-4">
        <router-link to="/" v-slot="{ isActive }">
          <Button :variant="isActive ? 'default' : 'outline'">
            <House class="w-4 h-4 mr-2" /> Home
          </Button>
        </router-link>
        <router-link to="/grid" v-slot="{ isActive }">
          <Button :variant="isActive ? 'default' : 'outline'">
            <LayoutGrid class="w-4 h-4 mr-2" /> Grid
          </Button>
        </router-link>
        <router-link to="/map" v-slot="{ isActive }">
          <Button :variant="isActive ? 'default' : 'outline'">
            <MapPinned class="w-4 h-4 mr-2" /> Map
          </Button>
        </router-link>
      </nav>
    </header>

    <main>
      <div class="app-container">
        <ModalComponent v-if="showFilters && isMobile" :isOpen="isFilterOpen" @close="closeFilter">
          <FilterComponent collapsed-by-default @closeModal="closeFilter"/>
        </ModalComponent>
        <SidebarComponent v-if="showFilters && !isMobile" class="sidebar" >
          <FilterComponent instant-apply />
        </SidebarComponent>
        <div class="main-content">
          <template v-if="showFilters">
            <SelectedFiltersDisplay />
            <p class="results-count" aria-live="polite">{{ resultsCountLabel }}</p>
            <hr class="my-4" v-if="restaurantStore.selectedFilterLabels.length > 0" />
            <div v-if="restaurantStore.filteredRestaurants.length > 0" class="h-full">
              <router-view
                 style="padding-right: 10px; padding-left: 10px"
                 :restaurants="restaurantStore.filteredRestaurants"
              />
            </div>
            <NoResultsDisplay v-else />
          </template>
          <router-view v-else />
        </div>
        <Button v-if="showFilters && isMobile" @click="openFilter" class="filter-button bg-blue-400">
          <Filter class="w-4 h-4 mr-2"/> Filter
        </Button>
      </div>
    </main>

    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';
import NoResultsDisplay from '@/components/NoResultsDisplay.vue';
import SelectedFiltersDisplay from '@/components/SelectedFiltersDisplay.vue';
import FilterComponent from '@/components/FilterComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { Button } from '@/components/ui/button';
import { useRestaurantStore } from '@/stores/restaurantStore';
import { MapPinned, LayoutGrid, Filter, House } from 'lucide-vue-next';

const restaurantStore = useRestaurantStore();
const route = useRoute();

const isMobile = useMediaQuery('(max-width: 768px)');
const isFilterOpen = ref(false);

const showFilters = computed(() => route.meta.showFilters !== false);

function openFilter() {
  isFilterOpen.value = true;
}

function closeFilter() {
  isFilterOpen.value = false;
}

const resultsCountLabel = computed(() => {
  const count = restaurantStore.filteredRestaurants.length;
  return count > 1 ? `${count} spots` : `${count} spot`;
});
</script>

<style>
a {
  color: #454545;
}

#navigation {
  display: flex;
  justify-content: center;
}

.app-container {
  display: flex;
}

.sidebar {
  width: 250px; /* Adjust the width as needed */
  position: sticky;
  top: 20px;
  align-self: flex-start;
  height: calc(100vh - 40px);
  overflow: hidden;
}

.main-content {
  flex-grow: 1; /* Take up the remaining space */
  padding: 20px; /* Add some padding */
}

.results-count {
  font-size: 0.85rem;
  color: #64748b;
  padding: 0 10px;
  margin: 4px 0 0;
}

.filter-button {
  position: fixed; /* Keep the button fixed at the bottom of the screen */
  bottom: 20px; /* Distance from the bottom */
  left: 50%; /* Position the button's left edge at the horizontal center */
  transform: translateX(-50%); /* Shift the button back by half its width to center it */
  max-width: 400px; /* Optional: Limit the maximum width to keep it visually appealing */
  width: 50%;
  padding: 10px 20px; /* Adjust for desired button size */
  border: none; /* Remove default border */
  border-radius: 5px; /* Round the corners */
  cursor: pointer; /* Change cursor to pointer on hover */
}

.router-link-exact-active .button-variant-outline {
  /* Style pour le bouton actif quand il est normalement en "outline" */
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
</style>