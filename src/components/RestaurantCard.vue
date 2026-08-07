<template>
  <a
    :href="mapsUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="thumbnail"
    :aria-label="`Open ${restaurant.name} in Google Maps (new tab)`"
  >
    <div class="caption">
      {{ restaurant.name }}
      <ExternalLink class="external-icon" aria-hidden="true" />
    </div>
    <img
      :src="imageSrc"
      :alt="restaurant.name"
      loading="lazy"
      decoding="async"
      width="400"
      height="400"
      @error="onImageError"
    />
  </a>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ExternalLink } from 'lucide-vue-next';
import type { Restaurant } from '@/types/types';

const props = defineProps<{ restaurant: Restaurant }>();

const hasError = ref(false);

const imageSrc = computed(() =>
  hasError.value ? '/egg.svg' : `/restaurant_pictures/${props.restaurant.id}.jpg`
);

function onImageError() {
  hasError.value = true;
}

const mapsUrl = computed(
  () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${props.restaurant.name} ${props.restaurant.addresse}`
    )}`
);
</script>

<style scoped>
img {
  display: block;
  height: 400px;
  width: 400px;
  object-fit: cover;
}

.thumbnail:hover {
  opacity: 0.5;
  cursor: pointer;
}

.thumbnail {
  position: relative;
  display: inline-block;
}

.caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 6px;
  text-align: center;
  color: white;
  font-weight: bold;
  background-color: #454545;
  padding: 7px;
}

.external-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
</style>

