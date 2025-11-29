// src/stores/restaurantStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import restaurantService from '@/api/restaurantService';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const useRestaurantStore = defineStore('restaurants', () => {
  // STATE (équivalent de data)
  const allRestaurants = ref(shuffleArray(restaurantService.localFetchRestaurants()));
  const filters = ref({
    cravings: [],
    cities: [],
    tags: [],
  });

  // GETTERS (équivalent de computed properties)
  const filteredRestaurants = computed(() => {
    if (filters.value.cravings.length === 0 && filters.value.cities.length === 0 && filters.value.tags.length === 0) {
      return allRestaurants.value;
    }
    return allRestaurants.value.filter(restaurant => {
      const cravingMatches = filters.value.cravings.length === 0 || filters.value.cravings.includes(restaurant.craving);
      const cityMatches = filters.value.cities.length === 0 || filters.value.cities.includes(String(restaurant.city));
      const tagMatches = filters.value.tags.length === 0 || restaurant.tags.some(tag => filters.value.tags.includes(tag));
      return cravingMatches && cityMatches && tagMatches;
    });
  });

  // ACTIONS (équivalent de methods)
  function applyFilters(newFilters) {
    filters.value = newFilters;
  }

  function resetFilters() {
    filters.value = { cravings: [], cities: [], tags: [] };
  }

  return { allRestaurants, filters, filteredRestaurants, applyFilters, resetFilters };
});