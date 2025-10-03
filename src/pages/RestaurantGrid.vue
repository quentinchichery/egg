<script setup>
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';
import RestaurantCard from '@/components/RestaurantCard.vue';

defineProps({
  restaurants: Array,
})
</script>

<template>
  <div id="grid_places">
    <div v-for="restaurant in restaurants" v-bind:key="restaurant">
      <RestaurantCard 
        :key="restaurant.id" 
        :restaurant="restaurant" 
        />
    </div>
  </div>
</template>

<style>
#grid_places {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
  justify-content: center;
  text-align: center;
}
</style>