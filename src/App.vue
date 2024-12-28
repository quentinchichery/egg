
<template>
  <div id="app">
    <header>
      <Header/>
      <div id="navigation">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <router-link to="/grid">
                <NavigationMenuLink :class="navigationMenuTriggerStyle()">Grille</NavigationMenuLink>
              </router-link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <router-link to="/map">
                <NavigationMenuLink :class="navigationMenuTriggerStyle()">Carte</NavigationMenuLink>
              </router-link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>

    <main>
      <div class="app-container">
        <ModalComponent v-if="isMobile" :isOpen="isFilterOpen" @close="closeFilter">
          <FilterComponent @filteredRestaurants="updatedRestaurants" />
        </ModalComponent>
        <SidebarComponent v-if="!isMobile" class="sidebar" >
          <FilterComponent @filteredRestaurants="updatedRestaurants" />
        </SidebarComponent>
        <div class="main-content">
          <router-view style="padding-right: 10px; padding-left: 10px" :restaurants="restaurants"/>
        </div>
        <button v-if="isMobile" @click="openFilter" class="filter-button">Filter</button>
      </div>
    </main>

    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script setup>
import FilterComponent from '@/components/FilterComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { ref, provide, onMounted, onBeforeUnmount } from 'vue';
import Header from '@/components/Header.vue';
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer.vue';
import restaurantService from '@/api/restaurantService';
import {
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

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
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>