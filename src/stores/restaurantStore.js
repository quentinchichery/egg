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

// --- Données de référence chargées une seule fois ---
const allCravings = restaurantService.localFetchCravings();
const allCities = restaurantService.localFetchCities();
const allTags = restaurantService.localFetchTags();


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

  // NOUVEAU GETTER : Permet d'obtenir les labels des filtres pour l'affichage
  const selectedFilterLabels = computed(() => {
    const labels = [];
    
    // 1. Cravings (Types)
    filters.value.cravings.forEach(id => {
      const item = allCravings.find(c => c.id === id);
      if (item) labels.push({ type: 'cravings', id: item.id, label: item.label });
    });
    
    // 2. Cities (Quartiers)
    filters.value.cities.forEach(id => {
      const item = allCities.find(c => c.id === id);
      if (item) labels.push({ type: 'cities', id: item.id, label: item.label });
    });
    
    // 3. Tags (Envies)
    filters.value.tags.forEach(id => {
            const item = allTags.find(tag => tag.id === id);
            if (item) labels.push({ type: 'tags', id: item.id, label: item.label });
        });
        return labels;
      });


  // ACTIONS (équivalent de methods)
  function applyFilters(newFilters) {
    filters.value = newFilters;
  }

  function resetFilters() {
    filters.value = { cravings: [], cities: [], tags: [] };
  }

  return { 
      allRestaurants, 
      filters, 
      filteredRestaurants, 
      selectedFilterLabels, // <--- EXPOSÉ pour l'App.vue
      applyFilters, 
      resetFilters 
  };
});