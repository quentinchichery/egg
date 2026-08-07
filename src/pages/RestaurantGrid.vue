<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import RestaurantCard from '@/components/RestaurantCard.vue';
import type { Restaurant } from '@/types/types';

const props = defineProps<{ restaurants: Restaurant[] }>();

// Tri des spots : "random" garde l'ordre déjà mélangé par le store (une fois par session),
// "newest" trie par id décroissant (les ids les plus élevés = ajoutés le plus récemment).
const sortMode = ref<'random' | 'newest'>('random');

const sortedRestaurants = computed(() =>
  sortMode.value === 'newest'
    ? [...props.restaurants].sort((a, b) => b.id - a.id)
    : props.restaurants
);

// Nombre de cartes montées à la fois, pour éviter de rendre les ~800 d'un coup.
const PAGE_SIZE = 40;
const visibleCount = ref(PAGE_SIZE);

const visibleRestaurants = computed(() => sortedRestaurants.value.slice(0, visibleCount.value));

// Réinitialise la pagination quand la liste triée/filtrée change (nouveaux filtres/recherche/tri).
watch(
  () => sortedRestaurants.value,
  () => {
    visibleCount.value = PAGE_SIZE;
  }
);

const sentinel = ref<HTMLElement | null>(null);

// Charge la page suivante quand la sentinelle en bas de grille devient visible.
useIntersectionObserver(sentinel, ([entry]) => {
  if (entry?.isIntersecting && visibleCount.value < sortedRestaurants.value.length) {
    visibleCount.value += PAGE_SIZE;
  }
});
</script>

<template>
  <div class="grid-toolbar">
    <label for="sort-select">Sort by</label>
    <select id="sort-select" v-model="sortMode" class="sort-select">
      <option value="random">Random</option>
      <option value="newest">Newest first</option>
    </select>
  </div>
  <div id="grid_places">
    <div v-for="restaurant in visibleRestaurants" :key="restaurant.id">
      <RestaurantCard 
        :restaurant="restaurant" 
      />
    </div>
  </div>
  <div ref="sentinel" class="scroll-sentinel" aria-hidden="true"></div>
</template>

<style>
.grid-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 12px;
}

.sort-select {
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
}

#grid_places {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
  justify-content: center;
  text-align: center;
}

.scroll-sentinel {
  height: 1px;
}
</style>