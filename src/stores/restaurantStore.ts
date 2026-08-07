// src/stores/restaurantStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import restaurantService from '@/api/restaurantService';
import { shuffleArray } from '@/lib/shuffle';
import { normalizeForSearch } from '@/lib/text';
import type { Restaurant, RestaurantFilters } from '@/types/types';

export interface SelectedFilterLabel {
  type: keyof RestaurantFilters;
  id: string;
  label: string;
}

// --- Données de référence chargées une seule fois ---
const allCravings = restaurantService.localFetchCravings();
const allCities = restaurantService.localFetchCities();
const allTags = restaurantService.localFetchTags();

// Fonction pure : un restaurant correspond-il aux filtres et à la recherche texte donnés ?
// Extraite pour être réutilisable (compteur de résultats à venir, `filteredRestaurants`, etc.).
function restaurantMatches(
  restaurant: Restaurant,
  filters: RestaurantFilters,
  normalizedQuery: string
): boolean {
  const cravingMatches = filters.cravings.length === 0 || filters.cravings.includes(restaurant.craving);
  const cityMatches = filters.cities.length === 0 || filters.cities.includes(String(restaurant.city));
  const tagMatches = filters.tags.length === 0 || restaurant.tags.some((tag) => filters.tags.includes(tag));
  const searchMatches =
    normalizedQuery.length === 0 ||
    normalizeForSearch(restaurant.name).includes(normalizedQuery) ||
    normalizeForSearch(restaurant.addresse).includes(normalizedQuery);

  return cravingMatches && cityMatches && tagMatches && searchMatches;
}

// Fonction pure : construit les labels affichables pour un jeu de filtres donné.
function labelsForFilters(filters: RestaurantFilters): SelectedFilterLabel[] {
  const labels: SelectedFilterLabel[] = [];

  // 1. Cravings (Types)
  filters.cravings.forEach((id) => {
    const item = allCravings.find((c) => c.id === id);
    if (item) labels.push({ type: 'cravings', id: item.id, label: item.label });
  });

  // 2. Cities (Quartiers)
  filters.cities.forEach((id) => {
    const item = allCities.find((c) => c.id === id);
    if (item) labels.push({ type: 'cities', id: item.id, label: item.label });
  });

  // 3. Tags (Envies)
  filters.tags.forEach((id) => {
    const item = allTags.find((tag) => tag.id === id);
    if (item) labels.push({ type: 'tags', id: item.id, label: item.label });
  });

  return labels;
}

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
    return allRestaurants.value.filter((restaurant) =>
      restaurantMatches(restaurant, filters.value, normalizedQuery)
    );
  });

  // Permet d'obtenir les labels des filtres pour l'affichage
  const selectedFilterLabels = computed<SelectedFilterLabel[]>(() => labelsForFilters(filters.value));

  // Les adresses les plus récemment ajoutées, basées sur l'id le plus élevé.
  // Lit la source non mélangée (restaurantService) car `allRestaurants` est shuffled à l'init.
  function getNewestRestaurants(count = 6): Restaurant[] {
    return [...restaurantService.localFetchRestaurants()].sort((a, b) => b.id - a.id).slice(0, count);
  }

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

  // Compte le nombre de restaurants qui correspondraient à un jeu de filtres/recherche
  // donné, sans l'appliquer. Utile pour prévisualiser le résultat avant validation
  // (ex: bouton "Chercher (N)" dans la modale de filtres mobile).
  function countMatching(candidateFilters: RestaurantFilters, query: string): number {
    const normalizedQuery = normalizeForSearch(query);
    return allRestaurants.value.filter((restaurant) =>
      restaurantMatches(restaurant, candidateFilters, normalizedQuery)
    ).length;
  }

  // Labels affichables pour un jeu de filtres arbitraire (ex: filtres en cours d'édition
  // dans la modale, avant validation).
  function labelsFor(candidateFilters: RestaurantFilters): SelectedFilterLabel[] {
    return labelsForFilters(candidateFilters);
  }

  return {
    allRestaurants,
    filters,
    searchQuery,
    filteredRestaurants,
    selectedFilterLabels,
    getNewestRestaurants,
    applyFilters,
    resetFilters,
    setSearchQuery,
    countMatching,
    labelsFor,
  };
});
