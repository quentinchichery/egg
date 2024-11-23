import { createRouter, createWebHistory } from 'vue-router';
import RestaurantGrid from '@/pages/RestaurantGrid.vue';
import RestaurantMap from '@/pages/RestaurantMap.vue';
import RestaurantDetails from '@/components/RestaurantDetails.vue';

const router = createRouter({
  history: createWebHistory(),
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
      path: '/restaurant/:id',
      name: 'restaurant-details',
      component: RestaurantDetails,
      props: route => ({
        id: route.params.id,
        name: route.query.name,
      })
    },
    {
      path: '/',
      redirect: '/grid'
    }
  ]
});

export default router;
