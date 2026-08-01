import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

vi.mock('@/api/restaurantService', () => ({
  default: {
    localFetchRestaurants: () => [
      { id: '1', name: 'Le Petit Café', lat: 48.86, long: 2.35, city: 75001, craving: 'cafe', tags: ['calme'], addresse: '1 rue de Rivoli' },
      { id: '2', name: 'Chez Momo', lat: 48.87, long: 2.36, city: 75002, craving: 'table', tags: ['romantique'], addresse: '2 rue Montorgueil' },
      { id: '3', name: 'Bar à Vins', lat: 48.85, long: 2.34, city: 75001, craving: 'bar', tags: ['calme', 'romantique'], addresse: '3 rue Étienne Marcel' },
    ],
    localFetchCravings: () => [
      { id: 'cafe', label: 'Café' },
      { id: 'table', label: 'Restaurant' },
      { id: 'bar', label: 'Bar' },
    ],
    localFetchCities: () => [
      { id: '75001', label: '1er' },
      { id: '75002', label: '2e' },
    ],
    localFetchTags: () => [
      { id: 'calme', label: 'Calme' },
      { id: 'romantique', label: 'Romantique' },
    ],
  },
}));

const { useRestaurantStore } = await import('./restaurantStore');

describe('useRestaurantStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("retourne tous les restaurants quand aucun filtre n'est actif", () => {
    const store = useRestaurantStore();
    expect(store.filteredRestaurants).toHaveLength(3);
  });

  it('filtre par craving', () => {
    const store = useRestaurantStore();
    store.applyFilters({ cravings: ['cafe'], cities: [], tags: [] });
    expect(store.filteredRestaurants.map((r) => r.id)).toEqual(['1']);
  });

  it('combine plusieurs types de filtres avec un ET logique', () => {
    const store = useRestaurantStore();
    store.applyFilters({ cravings: [], cities: ['75001'], tags: ['romantique'] });
    expect(store.filteredRestaurants.map((r) => r.id)).toEqual(['3']);
  });

  it('filtre par recherche texte, insensible aux accents et à la casse', () => {
    const store = useRestaurantStore();
    store.setSearchQuery('CAFE'); // sans accent et en majuscule, doit matcher "Café"
    expect(store.filteredRestaurants.map((r) => r.id)).toEqual(['1']);
  });

  it('expose les labels des filtres sélectionnés', () => {
    const store = useRestaurantStore();
    store.applyFilters({ cravings: ['bar'], cities: [], tags: [] });
    expect(store.selectedFilterLabels).toEqual([{ type: 'cravings', id: 'bar', label: 'Bar' }]);
  });

  it('resetFilters vide tous les filtres', () => {
    const store = useRestaurantStore();
    store.applyFilters({ cravings: ['bar'], cities: [], tags: [] });
    store.resetFilters();
    expect(store.filteredRestaurants).toHaveLength(3);
  });
});
