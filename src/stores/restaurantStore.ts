// src/stores/restaurantStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import restaurantService from '@/api/restaurantService';
import { shuffleArray } from '@/lib/shuffle';
import { normalizeForSearch } from '@/lib/text';
import type { Restaurant, RestaurantFilters } from '@/types/types';

interface SelectedFilterLabel {
  type: keyof RestaurantFilters;
  id: string;
  label: string;
}

// --- Données de référence chargées une seule fois ---
const allCravings = restaurantService.localFetchCravings();
const allCities = restaurantService.localFetchCities();
const allTags = restaurantService.localFetchTags();

export const useRestaurantStore = defineStore('restaurants', () => {
  // STATE (équivalent de data)
  const allRestaurants = ref<Restaurant[]>(shuffleArray(restaurantService.localFetchRestaurants()));
  const filters = ref<RestaurantFilters>({
    cravings: [],
    cities: [],
    tags: [],
  });
  const searchQuery = ref('');

  // GETTERS (équivalent de computed properties)
  const filteredRestaurants = computed<Restaurant[]>(() => {
    const normalizedQuery = normalizeForSearch(searchQuery.value);

    return allRestaurants.value.filter((restaurant) => {
      const cravingMatches =
        filters.value.cravings.length === 0 || filters.value.cravings.includes(restaurant.craving);
      const cityMatches =
        filters.value.cities.length === 0 || filters.value.cities.includes(String(restaurant.city));
      const tagMatches =
        filters.value.tags.length === 0 || restaurant.tags.some((tag) => filters.value.tags.includes(tag));
      const searchMatches =
        normalizedQuery.length === 0 ||
        normalizeForSearch(restaurant.name).includes(normalizedQuery) ||
        normalizeForSearch(restaurant.addresse).includes(normalizedQuery);

      return cravingMatches && cityMatches && tagMatches && searchMatches;
    });
  });

  // Permet d'obtenir les labels des filtres pour l'affichage
  const selectedFilterLabels = computed<SelectedFilterLabel[]>(() => {
    const labels: SelectedFilterLabel[] = [];

    // 1. Cravings (Types)
    filters.value.cravings.forEach((id) => {
      const item = allCravings.find((c) => c.id === id);
      if (item) labels.push({ type: 'cravings', id: item.id, label: item.label });
    });

    // 2. Cities (Quartiers)
    filters.value.cities.forEach((id) => {
      const item = allCities.find((c) => c.id === id);
      if (item) labels.push({ type: 'cities', id: item.id, label: item.label });
    });

    // 3. Tags (Envies)
    filters.value.tags.forEach((id) => {
      const item = allTags.find((tag) => tag.id === id);
      if (item) labels.push({ type: 'tags', id: item.id, label: item.label });
    });

    return labels;
  });

  // ACTIONS (équivalent de methods)
  function applyFilters(newFilters: RestaurantFilters) {
    filters.value = newFilters;
  }

  function resetFilters() {
    filters.value = { cravings: [], cities: [], tags: [] };
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
  }

  return {
    allRestaurants,
    filters,
    searchQuery,
    filteredRestaurants,
    selectedFilterLabels,
    applyFilters,
    resetFilters,
    setSearchQuery,
  };
});
