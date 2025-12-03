
<template>
  <div id="app">
    <header>
      <Header/>
        <div id="navigation" class="flex space-x-4">
        <router-link to="/grid" v-slot="{ isActive }">
          <Button :variant="isActive ? 'default' : 'outline'">
            <LayoutGrid class="w-4 h-4 mr-2" /> Grille
          </Button>
        </router-link>
        <router-link to="/map" v-slot="{ isActive }">
          <Button :variant="isActive ? 'default' : 'outline'">
            <MapPinned class="w-4 h-4 mr-2" /> Carte
          </Button>
        </router-link>
        </div>
    </header>

    <main>
      <div class="app-container">
        <ModalComponent v-if="isMobile" :isOpen="isFilterOpen" @close="closeFilter">
          <FilterComponent @filteredRestaurants="updatedRestaurants" @closeModal="closeFilter"/>
        </ModalComponent>
        <SidebarComponent v-if="!isMobile" class="sidebar" >
          <FilterComponent @filteredRestaurants="updatedRestaurants" />
        </SidebarComponent>
        <div class="main-content">
          <SelectedFiltersDisplay /> 
          <hr class="my-4" v-if="restaurantStore.selectedFilterLabels.length > 0" />
          <router-view style="padding-right: 10px; padding-left: 10px" :restaurants="restaurantStore.filteredRestaurants"/>
        </div>
        <Button v-if="isMobile" @click="openFilter" class="filter-button bg-blue-400">
          <Filter class="w-4 h-4 mr-2"/> Filter
        </Button>
      </div>
    </main>

    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script setup>
import SelectedFiltersDisplay from '@/components/SelectedFiltersDisplay.vue';
import FilterComponent from '@/components/FilterComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { useRestaurantStore } from '@/stores/restaurantStore';
import { ref, provide, onMounted, onBeforeUnmount } from 'vue';
import Header from '@/components/Header.vue';
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer.vue';
import restaurantService from '@/api/restaurantService';
import {
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { MapPinned } from 'lucide-vue-next';
import { LayoutGrid } from 'lucide-vue-next';
import { Filter } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute();
const restaurantStore = useRestaurantStore();

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffledArray = [...array]; // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

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
  overflow-y: auto; /* Enable scrolling if content overflows */
}

.main-content {
  flex-grow: 1; /* Take up the remaining space */
  padding: 20px; /* Add some padding */
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