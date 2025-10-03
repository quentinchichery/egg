<template>
      <form @submit.prevent="onSubmit">
        <div class="flex items-center space-x-4 w-full">
          <span class="text-lg font-bold flex-1 pl-4">Types</span>
          <Button type="button" variant="ghost" size="icon" @click="setContentCravings">
            <ChevronDown class="w-4 h-4" />
          </Button>
        </div>
          <div v-show='contentVisibleCravings'>
            <FormField name="cravings">
              <FormItem>
                <div class="flex flex-wrap justify-center space-x-1 space-y-1">
                  <FormField
                    v-for="craving in cravings"
                    v-slot="{ value, handleChange }"
                    :key="craving.id"
                    type="checkbox"
                    :value="craving.id"
                    :unchecked-value="false"
                    name="cravings"
                  >
                    <FormItem class="flex flex-row items-center space-x-3">
                      <FormControl>
                        <Toggle
                          :pressed="value.includes(craving.id)"
                          @update:pressed="handleChange"
                        >
                        <div class="flex items-center space-x-2 font-normal">
                          <img :src="getIconForCraving(craving.id)" alt="" class="w-5 h-5" />
                          <span>{{ craving.label }}</span>
                        </div>
                        </Toggle>
                      </FormControl>
                    </FormItem>
                  </FormField>
                </div>
              </FormItem>
            </FormField>
          </div>
        <Separator class="my-4" />
        <div class="flex items-center space-x-4 w-full">
          <span class="text-lg font-bold flex-1 pl-4">Quartiers</span>
          <Button type="button" variant="ghost" size="icon" @click="setContentCities">
            <ChevronDown class="w-4 h-4" />
          </Button>
        </div>
          <div v-show='contentVisibleCities'>
            <FormField name="cities">
              <FormItem>
                <div class="flex flex-wrap justify-center space-x-1 space-y-1">
                  <FormField
                    v-for="city in cities"
                    v-slot="{ value, handleChange }"
                    :key="city.id"
                    type="checkbox"
                    :value="city.id"
                    :unchecked-value="false"
                    name="cities"
                  >
                    <FormItem class="flex flex-row items-center space-x-3">
                      <FormControl>
                        <Toggle
                          :pressed="value.includes(city.id)"
                          @update:pressed="handleChange"
                        >
                        <div class="flex items-center space-x-2 font-normal">
                          <span>{{ city.label }}</span>
                        </div>
                        </Toggle>
                      </FormControl>
                    </FormItem>
                  </FormField>
                </div>
              </FormItem>
            </FormField>
        </div>
        <Separator class="my-4" />
        <div class="flex items-center space-x-4 w-full">
          <span class="text-lg font-bold flex-1 pl-4">Envies</span>
          <Button type="button" variant="ghost" size="icon" @click="setContentTags">
            <ChevronDown class="w-4 h-4" />
          </Button>
        </div>
          <div v-show='contentVisibleTags'>
           <!-- <ScrollArea class="h-48 rounded-md " type="always"> -->
              <FormField name="tags">
                <FormItem>
                  <div class="flex flex-wrap justify-center space-x-1 space-y-1">
                    <FormField
                      v-for="tag in tags"
                      v-slot="{ value, handleChange }"
                      :key="tag.id"
                      type="checkbox"
                      :value="tag.id"
                      :unchecked-value="false"
                      name="tags"
                    >
                      <FormItem class="flex flex-row items-center space-x-3">
                        <FormControl>
                          <Toggle
                            :pressed="value.includes(tag.id)"
                            @update:pressed="handleChange"
                          >
                          <div class="flex items-center space-x-2 font-normal">
                            <span>{{ tag.label }}</span>
                          </div>
                          </Toggle>
                        </FormControl>
                      </FormItem>
                    </FormField>
                  </div>
                </FormItem>
              </FormField>
            <!-- </ScrollArea> -->
          </div>
        
        <div class="flex items-center justify-between w-full">
          <Button class="mt-3.5 ml-2" variant="ghost" @click="resetToggles">Effacer</Button>
          <Button class="mt-3.5 mr-2 bg-blue-500" type="submit">Chercher</Button>
        </div>

      </form>

</template>

<script setup>
import restaurantService from '@/api/restaurantService';
import { cravingIcons } from '@/services/constants';
import { ChevronDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { h } from 'vue';
import * as z from 'zod';
import { ref, computed } from 'vue';
import { watch } from 'vue';
import { useRestaurantStore } from '@/stores/restaurantStore';

const restaurantStore = useRestaurantStore();

const cravings = restaurantService.localFetchCravings();
const cities = restaurantService.localFetchCities();
const tags = restaurantService.localFetchTags();

const formSchema = toTypedSchema(
  z.object({
    cravings: z.array(z.string()),
    cities: z.array(z.string()),
    tags: z.array(z.string()),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    cravings: [],
    cities: [],
    tags: []
  },
})

const filteredRestaurants = ref([]);
const emit = defineEmits(['filteredRestaurants', 'closeModal']);

const restaurants = ref(restaurantService.localFetchRestaurants());

const applyFilters = (values) => {
  filteredRestaurants.value = restaurants.value.filter(item => {
      const cravingMatches = values.cravings.length === 0 || values.cravings.includes(item.craving);
      const cityMatches = values.cities.length === 0 || values.cities.includes(String(item.city));
      const tagMatches = values.tags.length === 0 || item.tags.some(tag => values.tags.includes(tag));
      return cravingMatches && cityMatches && tagMatches;
    });
  emit('filteredRestaurants', filteredRestaurants.value);
  };

const onSubmit = handleSubmit((values) => {
  restaurantStore.applyFilters(values); // On appelle l'action du store
  emit('closeModal');
});

const resetToggles = () => {
  resetForm(); // Ceci vient de vee-validate
  restaurantStore.resetFilters(); // On reset aussi l'état dans le store
};

const contentVisibleCravings = ref(true);
const contentVisibleCities = ref(true);
const contentVisibleTags = ref(true);

const setContentCravings = () => {
  contentVisibleCravings.value = !contentVisibleCravings.value;
};
const setContentCities = () => {
  contentVisibleCities.value = !contentVisibleCities.value;
};
const setContentTags = () => {
  contentVisibleTags.value = !contentVisibleTags.value;
};

const getIconForCraving = (cravingId) => {
  return cravingIcons[cravingId] || '/icons/default.png';
};

</script>
