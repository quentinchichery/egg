<script setup>
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';
import RestaurantCard from '@/components/RestaurantCard.vue';

defineProps({
  restaurants: Array,
})
</script>

<template>
  <div v-if="restaurants && restaurants.length > 0" id="grid_places">
    <div v-for="restaurant in restaurants" v-bind:key="restaurant">
      <RestaurantCard 
        :key="restaurant.id" 
        :restaurant="restaurant" 
        />
    </div>
  </div>

<div v-else class="no-results-message">
    <span class="material-icons sad-icon">
      sentiment_dissatisfied
    </span>
    <h2>Aucune adresse ne correspond aux filtres choisis.</h2>
    <p>Veuillez essayer de modifier vos critères de recherche.</p>
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

.no-results-message {
  text-align: center;
  padding: 20px;
  margin-top: 30px;
  border: 1px solid #ccc; /* Optionnel : pour mettre en évidence le message */
  border-radius: 8px; /* Optionnel */
  background-color: #f9f9f9; /* Optionnel */
}

.no-results-message h2 {
  color: #333;
  margin-bottom: 10px;
}

.sad-icon {
  font-size: 48px;
  color: #007fff;
  display: block;
  margin: 0 auto 10px;
}
</style>