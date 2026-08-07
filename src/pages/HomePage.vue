<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Instagram, LayoutGrid, MapPinned } from 'lucide-vue-next';
import RestaurantCard from '@/components/RestaurantCard.vue';
import { Button } from '@/components/ui/button';
import { useRestaurantStore } from '@/stores/restaurantStore';

const restaurantStore = useRestaurantStore();

const creators = [
  { handle: '@camilledrs', url: 'https://www.instagram.com/camilledrs', image: '/profile_pictures/camille.jpg' },
  { handle: '@quentinchichery', url: 'https://www.instagram.com/quentinchichery', image: '/profile_pictures/quentin.jpg' },
];

const brokenImages = ref<Record<string, boolean>>({});

function onProfileImageError(handle: string) {
  brokenImages.value[handle] = true;
}
</script>

<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-actions">
        <RouterLink to="/grid">
          <Button variant="outline">
            <LayoutGrid class="w-4 h-4 mr-2" /> Browse the grid
          </Button>
        </RouterLink>
        <RouterLink to="/map">
          <Button variant="outline">
            <MapPinned class="w-4 h-4 mr-2" /> Explore the map
          </Button>
        </RouterLink>
      </div>
    </section>

    <section class="hot-new-spots">
      <h3>Hot new spots</h3>
      <div class="cards-grid">
        <RestaurantCard
          v-for="restaurant in restaurantStore.getNewestRestaurants()"
          :key="restaurant.id"
          :restaurant="restaurant"
        />
      </div>
    </section>

    <section class="mission">
      <h3>Our mission</h3>
      <p>
        We share our favourite spots in Paris in a simple, enjoyable app — 
        so you can always find a great place to eat, shop or drink nearby, 
        curated by people who love this city as much as you do.
      </p>
    </section>

    <section class="creators">
      <h3>Follow us on Instagram</h3>
      <div class="creators-list">
        <a
          v-for="creator in creators"
          :key="creator.handle"
          :href="creator.url"
          target="_blank"
          rel="noopener noreferrer"
          class="creator"
        >
          <img
            :src="brokenImages[creator.handle] ? '/egg.svg' : creator.image"
            :alt="creator.handle"
            class="creator-avatar"
            loading="lazy"
            @error="onProfileImageError(creator.handle)"
          />
          <span class="creator-handle">
            <Instagram class="w-4 h-4 mr-1" aria-hidden="true" />
            {{ creator.handle }}
          </span>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 24px;
  text-align: center;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hot-new-spots h3,
.mission h3,
.creators h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.cards-grid > * {
  flex: 0 1 260px;
}

.mission p {
  max-width: 640px;
  margin: 0 auto;
  color: #454545;
}

.creators-list {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.creator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: inherit;
  text-decoration: none;
}

.creator-avatar {
  width: 96px;
  height: 96px;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid #e2e8f0;
}

.creator-handle {
  display: flex;
  align-items: center;
  font-weight: 600;
}
</style>
