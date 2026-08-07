<template>
  <div v-if="labels.length > 0" class="selected-filters-container">
    <span class="font-semibold text-sm mr-2">Active filters:</span>
    
    <div 
      v-for="filter in labels" 
      :key="filter.id + filter.type"
      class="filter-tag"
      @click="removeFilter(filter)"
    >
      {{ filter.label }}
      <span class="material-icons close-icon">close</span>
    </div>
    
    <Button variant="link" class="clear-all-button" @click="clearAll">
        Clear all
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRestaurantStore } from '@/stores/restaurantStore';
import { Button } from '@/components/ui/button';
import type { RestaurantFilters } from '@/types/types';
// Assurez-vous d'avoir les Material Icons chargés dans votre index.html

interface SelectedFilterLabel {
  type: keyof RestaurantFilters;
  id: string;
  label: string;
}

// Sans prop `filters`, le composant lit/écrit directement le store (usage historique,
// filtres déjà appliqués). Avec `filters`, il devient contrôlé : il affiche les filtres
// fournis (ex: filtres en cours d'édition dans la modale) et délègue les actions via events.
const props = defineProps<{ filters?: RestaurantFilters }>();
const emit = defineEmits<{
  remove: [filter: SelectedFilterLabel];
  clearAll: [];
}>();

const restaurantStore = useRestaurantStore();

const labels = computed(() =>
  props.filters ? restaurantStore.labelsFor(props.filters) : restaurantStore.selectedFilterLabels
);

const removeFilter = (filterToRemove: SelectedFilterLabel) => {
  if (props.filters) {
    emit('remove', filterToRemove);
    return;
  }

  const current: RestaurantFilters = JSON.parse(JSON.stringify(restaurantStore.filters)); // Copie des filtres

  current[filterToRemove.type] = current[filterToRemove.type].filter((id) => id !== filterToRemove.id);

  restaurantStore.applyFilters(current);
};

const clearAll = () => {
  if (props.filters) {
    emit('clearAll');
    return;
  }

  restaurantStore.resetFilters();
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