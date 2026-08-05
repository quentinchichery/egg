<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import RestaurantCard from '@/components/RestaurantCard.vue';
import type { Restaurant } from '@/types/types';

const props = defineProps<{ restaurants: Restaurant[] }>();

// Nombre de cartes montées à la fois, pour éviter de rendre les ~800 d'un coup.
const PAGE_SIZE = 40;
const visibleCount = ref(PAGE_SIZE);

const visibleRestaurants = computed(() => props.restaurants.slice(0, visibleCount.value));

// Réinitialise la pagination quand la liste filtrée change (nouveaux filtres/recherche).
watch(
  () => props.restaurants,
  () => {
    visibleCount.value = PAGE_SIZE;
  }
);

const sentinel = ref<HTMLElement | null>(null);

// Charge la page suivante quand la sentinelle en bas de grille devient visible.
useIntersectionObserver(sentinel, ([entry]) => {
  if (entry?.isIntersecting && visibleCount.value < props.restaurants.length) {
    visibleCount.value += PAGE_SIZE;
  }
});
</script>

<template>
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