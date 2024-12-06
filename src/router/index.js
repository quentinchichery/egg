import { createRouter, createWebHistory } from 'vue-router';
import RestaurantGrid from '@/pages/RestaurantGrid.vue';
import RestaurantMap from '@/pages/RestaurantMap.vue';

const router = createRouter({
  history: createWebHistory('/egg/'),
  routes: [
    {
      path: '/grid',
      name: 'RestaurantGrid',
      component: RestaurantGrid
    },
    {
      path: '/map',
      name: 'RestaurantMap',
      component: RestaurantMap
    },
    {
      path: '/',
      redirect: '/grid'
    }
  ]
});

export default router;
