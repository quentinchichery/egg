<template>
  <div v-if="restaurantStore.selectedFilterLabels.length > 0" class="selected-filters-container">
    <span class="font-semibold text-sm mr-2">Filtres appliqués :</span>
    
    <div 
      v-for="filter in restaurantStore.selectedFilterLabels" 
      :key="filter.id + filter.type"
      class="filter-tag"
      @click="removeFilter(filter)"
    >
      {{ filter.label }}
      <span class="material-icons close-icon">close</span>
    </div>
    
    <Button variant="link" class="clear-all-button" @click="restaurantStore.resetFilters()">
        Effacer tout
    </Button>
  </div>
</template>

<script setup>
import { useRestaurantStore } from '@/stores/restaurantStore';
import { Button } from '@/components/ui/button';
// Assurez-vous d'avoir les Material Icons chargés dans votre index.html

const restaurantStore = useRestaurantStore();

const removeFilter = (filterToRemove) => {
  const current = JSON.parse(JSON.stringify(restaurantStore.filters)); // Copie des filtres
  
  if (filterToRemove.type === 'cravings') {
    current.cravings = current.cravings.filter(id => id !== filterToRemove.id);
  } else if (filterToRemove.type === 'cities') {
    current.cities = current.cities.filter(id => id !== filterToRemove.id);
  } else if (filterToRemove.type === 'tags') {
    current.tags = current.tags.filter(id => id !== filterToRemove.id);
  }
  
  restaurantStore.applyFilters(current);
};
</script>

<style scoped>
/* Les styles spécifiques aux tags sont isolés ici */
.selected-filters-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 10px;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  /* COULEURS MISES À JOUR POUR HARMONISER AVEC #007fff */
  background-color: #e6f3ff; /* Un bleu très pâle pour le fond (similaire à #007fff avec 80% de transparence ou plus) */
  color: #0066cc; /* Un bleu un peu plus foncé que #007fff pour un bon contraste */
  border: 1px solid #99ccff; /* Une bordure dans les tons bleus clairs */
  /* FIN COULEURS MISES À JOUR */
  
  border-radius: 12px;
  padding: 4px 8px;
  margin: 4px 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.filter-tag:hover {
  /* COULEUR DE SURVOL MISE À JOUR */
  background-color: #cce0ff; /* Bleu légèrement plus marqué au survol */
}

.close-icon {
  font-size: 14px;
  margin-left: 5px;
  line-height: 1;
}

.clear-all-button {
    height: auto;
    padding: 0 5px;
    font-size: 0.8rem;
    color: #555555;
}
</style>