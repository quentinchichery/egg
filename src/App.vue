
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
      <div class="flex flex-col md:flex-row">
        <div class="order-1 md:order-1 w-full md:w-64 p-4 md:sticky md:top-0">
          <RestaurantFilterForm @filteredRestaurants="updatedRestaurants" />
        </div>
        <div class="order-2 md:order-2 flex-1 p-4">
          <router-view :restaurants="restaurants" />
        </div>
      </div>

    </main>

    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import Header from '@/components/Header.vue';
import RestaurantFilterForm from '@/components/RestaurantFilterForm.vue';
import Footer from '@/components/Footer.vue';
import restaurantService from '@/api/restaurantService';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

// Initialize reactive data
const restaurants = ref(restaurantService.localFetchRestaurants());

// Update function to handle filtering in FilterComponent
function updatedRestaurants(newData) {
  restaurants.value = newData;
}

</script>

<style>
a {
  color: #454545;
}

#navigation {
  display: flex;
  justify-content: center;
}
</style>