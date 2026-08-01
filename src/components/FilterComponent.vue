<template>
  <div class="flex h-full min-h-0 flex-1 flex-col">
    <div class="search-field shrink-0">
      <Search class="search-icon" aria-hidden="true" />
      <input
        v-model="searchInput"
        type="search"
        placeholder="Rechercher un nom, une adresse…"
        aria-label="Rechercher une adresse par nom ou adresse"
        class="search-input"
      />
    </div>

    <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3">
      <SelectedFiltersDisplay :filters="localFilters" @remove="removeSelectedFilter" @clear-all="onReset" />

      <FilterSection
        title="Types"
        :options="cravingOptions"
        :model-value="localFilters.cravings"
        :default-open="!collapsedByDefault"
        with-separator
        @update:model-value="updateCravings"
      />
      <FilterSection
        title="Quartiers"
        :options="cityOptions"
        :model-value="localFilters.cities"
        :default-open="!collapsedByDefault"
        with-separator
        @update:model-value="updateCities"
      />
      <FilterSection
        title="Envies"
        :options="tagOptions"
        :model-value="localFilters.tags"
        :default-open="!collapsedByDefault"
        @update:model-value="updateTags"
      />
    </div>

    <div class="flex shrink-0 items-center justify-between w-full border-t px-1 pt-3 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
      <Button class="ml-2" variant="ghost" type="button" @click="onReset">Effacer</Button>
      <Button v-if="!instantApply" class="mr-2 bg-blue-500" type="button" @click="onSubmit">
        Chercher ({{ matchingCount }})
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue';
import { Search } from 'lucide-vue-next';
import restaurantService from '@/api/restaurantService';
import { cravingIcons } from '@/services/constants';
import { Button } from '@/components/ui/button';
import FilterSection from '@/components/FilterSection.vue';
import SelectedFiltersDisplay from '@/components/SelectedFiltersDisplay.vue';
import { useRestaurantStore } from '@/stores/restaurantStore';
import type { RestaurantFilters } from '@/types/types';

const props = withDefaults(defineProps<{ instantApply?: boolean; collapsedByDefault?: boolean }>(), {
  instantApply: false,
  collapsedByDefault: false,
});
const emit = defineEmits<{ closeModal: [] }>();

const restaurantStore = useRestaurantStore();

const cravingOptions = restaurantService.localFetchCravings().map((craving) => ({
  ...craving,
  icon: cravingIcons[craving.id] ?? cravingIcons.default,
}));
const cityOptions = restaurantService.localFetchCities();
const tagOptions = restaurantService.localFetchTags();

const localFilters = reactive<RestaurantFilters>({
  cravings: [...restaurantStore.filters.cravings],
  cities: [...restaurantStore.filters.cities],
  tags: [...restaurantStore.filters.tags],
});

// Garde le formulaire synchronisé si les filtres changent ailleurs
// (ex: suppression d'un tag depuis SelectedFiltersDisplay, ou reset).
watch(
  () => restaurantStore.filters,
  (newFilters) => {
    localFilters.cravings = [...newFilters.cravings];
    localFilters.cities = [...newFilters.cities];
    localFilters.tags = [...newFilters.tags];
  },
  { deep: true }
);

function applyIfInstant() {
  if (props.instantApply) {
    restaurantStore.applyFilters({
      cravings: [...localFilters.cravings],
      cities: [...localFilters.cities],
      tags: [...localFilters.tags],
    });
  }
}

function updateCravings(value: string[]) {
  localFilters.cravings = value;
  applyIfInstant();
}

function updateCities(value: string[]) {
  localFilters.cities = value;
  applyIfInstant();
}

function updateTags(value: string[]) {
  localFilters.tags = value;
  applyIfInstant();
}

function removeSelectedFilter(filter: { type: keyof RestaurantFilters; id: string }) {
  localFilters[filter.type] = localFilters[filter.type].filter((id) => id !== filter.id);
  applyIfInstant();
}

function onSubmit() {
  restaurantStore.applyFilters({
    cravings: [...localFilters.cravings],
    cities: [...localFilters.cities],
    tags: [...localFilters.tags],
  });
  emit('closeModal');
}

function onReset() {
  localFilters.cravings = [];
  localFilters.cities = [];
  localFilters.tags = [];
  restaurantStore.resetFilters();
}

// Recherche texte : toujours appliquée en direct (avec un léger debounce),
// indépendamment du mode instantApply des autres filtres.
const searchInput = ref(restaurantStore.searchQuery);
let searchDebounceId: ReturnType<typeof setTimeout> | undefined;

watch(searchInput, (value) => {
  clearTimeout(searchDebounceId);
  searchDebounceId = setTimeout(() => {
    restaurantStore.setSearchQuery(value);
  }, 200);
});

onBeforeUnmount(() => {
  clearTimeout(searchDebounceId);
});

// Nombre de résultats que donneraient les filtres actuellement édités (avant validation),
// affiché sur le bouton "Chercher" pour prévisualiser l'effet du filtrage.
const matchingCount = computed(() =>
  restaurantStore.countMatching(
    {
      cravings: localFilters.cravings,
      cities: localFilters.cities,
      tags: localFilters.tags,
    },
    searchInput.value
  )
);
</script>

<style scoped>
.search-field {
  position: relative;
  padding: 0 12px 16px;
}

.search-icon {
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 34px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
}

.search-input:focus {
  outline: none;
  border-color: #007fff;
  box-shadow: 0 0 0 2px rgba(0, 127, 255, 0.2);
}
</style>

