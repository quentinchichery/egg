<template>
  <div v-if="restaurant">
    <h1 class="text-2xl font-bold">{{ restaurant.id }}</h1>
      <h3>{{ restaurant.name }}</h3>
      <p>{{ restaurant.addresse }}</p>
    <img :src="'/restaurant_pictures/' + restaurant.id + '.jpg'" alt="Restaurant image" class="restaurant-image" loading="lazy"/>
  </div>
  <div v-else>
    <p>Restaurant not found.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import restaurantService from '@/api/restaurantService';

const restaurants = restaurantService.localFetchRestaurants();

const props = defineProps({
  id: String,
})

const getRestaurantById = (id) => {
  return restaurants.find(restaurant => restaurant.id === id) || null;
};

const restaurant = ref(null);

// Fetch restaurant details when component is mounted
onMounted(() => {
  fetchRestaurantDetails();
});

function fetchRestaurantDetails() {
  const restaurantId = parseInt(props.id);
  restaurant.value = getRestaurantById(restaurantId);
}

</script>
