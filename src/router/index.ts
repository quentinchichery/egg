import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import RestaurantGrid from '@/pages/RestaurantGrid.vue';
import RestaurantMap from '@/pages/RestaurantMap.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: { showFilters: false, hideNav: true }
    },
    {
      path: '/grid',
      name: 'RestaurantGrid',
      component: RestaurantGrid,
      meta: { showFilters: true }
    },
    {
      path: '/map',
      name: 'RestaurantMap',
      component: RestaurantMap,
      meta: { showFilters: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

export default router;
