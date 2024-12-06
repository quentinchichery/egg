<template>

      <form @submit.prevent="onSubmit">
        <div class="flex items-center space-x-4">
          <span class="text-lg">Filtrer par envie</span>
          <Button type="button" variant="outline" size="icon" @click="setContentCravings">
            <ChevronDown class="w-4 h-4" />
          </Button>
        </div>
          <div v-show='contentVisibleCravings'>
            <ScrollArea class="h-28 rounded-md ">
              <FormField name="cravings">
                <FormItem >
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
              </ScrollArea>
            </div>
        <div class="flex items-center space-x-4">
          <span class="text-lg">Filtrer par quartiers</span>
          <Button type="button" variant="outline" size="icon" @click="setContentCities">
            <ChevronDown class="w-4 h-4" />
          </Button>
        </div>
          <div v-show='contentVisibleCities'>
            <ScrollArea class="h-28 rounded-md ">
              <FormField name="cities">
                <FormItem>
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
            </ScrollArea>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-lg">Filtrer par tags</span>
          <Button type="button" variant="outline" size="icon" @click="setContentTags">
            <ChevronDown class="w-4 h-4" />
          </Button>
        </div>
          <div v-show='contentVisibleTags'>
            <ScrollArea class="h-28 rounded-md ">
              <FormField name="tags">
                <FormItem>
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
              </ScrollArea>
          </div>
        
        <Button type="submit">Chercher</Button>
      </form>

</template>

<script setup>
import restaurantService from '@/api/restaurantService';
import { ChevronDown } from 'lucide-vue-next'
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
import { watch } from 'vue';



const cities = [];
restaurantService.localFetchCities().forEach((x, i) =>  cities.push({id: x, label: x}));

// interface Craving {
//   id: string;
//   label: string;
// }
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

const filteredRestaurants = ref([]);
const emit = defineEmits(['filteredRestaurants']);

const restaurants = ref(restaurantService.localFetchRestaurants());


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
</script>

<style>


form div {
  margin-bottom: 10px;
}

</style>