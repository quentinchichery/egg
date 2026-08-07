<template>
  <div class="flex items-center space-x-4 w-full">
    <span class="text-lg font-bold flex-1 pl-4">
      {{ title }}
      <span v-if="modelValue.length > 0" class="ml-1 text-sm font-normal text-muted-foreground">
        ({{ modelValue.length }})
      </span>
    </span>
    <Button
      type="button"
      variant="ghost"
      size="icon"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? `Hide ${title} filter` : `Show ${title} filter`"
      @click="isOpen = !isOpen"
    >
      <ChevronDown class="w-4 h-4" />
    </Button>
  </div>
  <div v-show="isOpen">
    <div class="flex flex-wrap justify-center space-x-1 space-y-1">
      <Toggle
        v-for="option in options"
        :key="option.id"
        :pressed="modelValue.includes(option.id)"
        @update:pressed="() => toggleOption(option.id)"
      >
        <div class="flex items-center space-x-2 font-normal">
          <img v-if="option.icon" :src="option.icon" alt="" class="w-5 h-5" />
          <span>{{ option.label }}</span>
        </div>
      </Toggle>
    </div>
  </div>
  <Separator v-if="withSeparator" class="my-4" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';

export interface FilterSectionOption {
  id: string;
  label: string;
  icon?: string;
}

const props = withDefaults(
  defineProps<{
    title: string;
    options: FilterSectionOption[];
    modelValue: string[];
    withSeparator?: boolean;
    defaultOpen?: boolean;
  }>(),
  {
    defaultOpen: true,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string[]];
}>();

const isOpen = ref(props.defaultOpen);

function toggleOption(id: string) {
  const next = props.modelValue.includes(id)
    ? props.modelValue.filter((value) => value !== id)
    : [...props.modelValue, id];
  emit('update:modelValue', next);
}
</script>
