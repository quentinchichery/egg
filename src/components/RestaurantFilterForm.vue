<template>
  <form @submit="onSubmit">
      <div class="form_title">
          Filtrer par envie
      </div>
    <div class="button_box">
      <button type="button" class="button" @click="setContentCravings">voir plus</button>
      </div>
       <div v-show='contentVisibleCravings'>
          <FormField name="cravings">
            <FormItem>
              <div class="mb-4">
                <FormDescription>
                  Sélectionne les adresses par envie.
                </FormDescription>
              </div>
                <FormField v-for="craving in cravings" v-slot="{ value, handleChange }" :key="craving.id" type="checkbox" :value="craving.id" :unchecked-value="false" name="cravings">
                  <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        :checked="value.includes(craving.id)"
                        @update:checked="handleChange"
                      />
                    </FormControl>
                    <FormLabel class="font-normal">
                      {{ craving.label }}
                    </FormLabel>
                  </FormItem>
                </FormField>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      <div class="form_title">
          Filtrer par quartiers
      </div>
    <div class="button_box">
      <button type="button" class="button" @click="setContentCities">voir plus</button>
      </div>
       <div v-show='contentVisibleCities'>
          <FormField name="cities">
            <FormItem>
              <div class="mb-4">
                <FormDescription>
                  Sélectionne les adresses par quartier.
                </FormDescription>
              </div>
                <FormField v-for="city in cities" v-slot="{ value, handleChange }" :key="city.id" type="checkbox" :value="city.id" :unchecked-value="false" name="cities">
                  <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        :checked="value.includes(city.id)"
                        @update:checked="handleChange"
                      />
                    </FormControl>
                    <FormLabel class="font-normal">
                      {{ city.label }}
                    </FormLabel>
                  </FormItem>
                </FormField>
              <FormMessage />
            </FormItem>
          </FormField>
    </div>
    <div class="form_title">
          Filtrer par tags
      </div>
    <div class="button_box">
      <button type="button" class="button" @click="setContentTags">voir plus</button>
      </div>
       <div v-show='contentVisibleTags'>
          <FormField name="tags">
            <FormItem>
              <div class="mb-4">
                <FormDescription>
                  Ajoute des tags.
                </FormDescription>
              </div>
                <FormField v-for="tag in tags" v-slot="{ value, handleChange }" :key="tag.id" type="checkbox" :value="tag.id" :unchecked-value="false" name="tags">
                  <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        :checked="value.includes(tag.id)"
                        @update:checked="handleChange"
                      />
                    </FormControl>
                    <FormLabel class="font-normal">
                      {{ tag.label }}
                    </FormLabel>
                  </FormItem>
                </FormField>
              <FormMessage />
            </FormItem>
          </FormField>
      </div>

    <div class="flex justify-center mt-4">
      <Button type="submit">
        Chercher
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import restaurantService from '@/api/restaurantService';
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import { ref, computed } from 'vue';


const cities = [];
restaurantService.localFetchCities().forEach((x, i) =>  cities.push({id: x, label: x}));
const cravings = [];
restaurantService.localFetchCravings().forEach((x, i) =>  cravings.push({id: x, label: x}));
const tags = [];
restaurantService.localFetchTags().forEach((x, i) =>  tags.push({id: x, label: x}));

const formSchema = toTypedSchema(z.object({
  cravings: z.array(z.string()),
  cities: z.array(z.number()),
  tags: z.array(z.string())
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    cravings: [],
    cities: [],
    tags: []
  },
})

const emit = defineEmits(['filteredRestaurants']);

const restaurants = ref(restaurantService.localFetchRestaurants());
const filteredRestaurants = ref([]);

const applyFilters = (values) => {
  filteredRestaurants.value = restaurants.value.filter(item => {
      const cravingMatches = values.cravings.length === 0 || values.cravings.includes(item.craving);
      const cityMatches = values.cities.length === 0 || values.cities.includes(item.city);
      const tagMatches = values.tags.length === 0 || item.tags.some(tag => values.tags.includes(tag));
      return cravingMatches && cityMatches && tagMatches;
    });
    emit('filteredRestaurants', filteredRestaurants.value);
  };

const onSubmit = handleSubmit((values) => {
  console.log(values)
  applyFilters(values)
})

const contentVisibleCravings = ref(true);
const contentVisibleCities = ref(false);
const contentVisibleTags = ref(false);

const setContentCravings = () => {
  contentVisibleCravings.value = !contentVisibleCravings.value;
};
const setContentCities = () => {
  contentVisibleCities.value = !contentVisibleCities.value;
};
const setContentTags = () => {
  contentVisibleTags.value = !contentVisibleTags.value;
};
</script>

<style>
#grid_places {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
  justify-content: center;
  text-align: center;
}

.button {
  width: 100%;
  border: solid 1px;
  border-color: black;
  background-color: #f8f8f8;
}

.button_box {
  display: flex;
  justify-content: center;
}

.button:hover {
  background-color: white;
}


</style>