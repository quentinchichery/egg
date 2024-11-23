<template>
  <div>
    <div id="map" style="height: 500px; width: 100%;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'vue-router';

// Configure Leaflet icon URLs
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
//   iconUrl: 'leaflet/dist/images/marker-icon.png',
//   shadowUrl: 'leaflet/dist/images/marker-shadow.png',
// });

// Props
const props = defineProps({
  restaurants: {
    type: Object,
    required: true
  }
});

// State
const map = ref(null);
const selectedRestaurant = ref(null);
const markers = ref([]);
const center = [48.8566, 2.3522];
const zoom = 12;

// Watchers
watch(
  () => props.restaurants,
  () => {
    if (map.value) addMarkers(); // Check if map is initialized
  },
  { immediate: true }
);

// Function to initialize map and add markers
const initializeMap = () => {
  map.value = L.map('map').setView([48.8566, 2.3522], 12);

  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value);

  addMarkers();
};

// Methods
function addMarkers() {
  if (Array.isArray(markers.value) && markers.value.length) {
    markers.value.forEach(marker => map.value.removeLayer(marker));
  }
  markers.value = [];
  props.restaurants.forEach(restaurant => {
    if (restaurant.lat != null && restaurant.long != null) {
      const marker = L.marker([restaurant.lat, restaurant.long]).addTo(map.value);

      // Create a link with an event listener for navigation
      const popupContent = document.createElement('div');
      popupContent.innerHTML = `<b>${restaurant.name}</b><br><a href="#" class="details-link">View Details</a>`;

      // Add click event to the link to navigate to the details page
      popupContent.querySelector('.details-link').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        showRestaurantDetails(restaurant);
      });

      marker.bindPopup(popupContent);
      markers.value.push(marker);
    }
  });
}

const router = useRouter();

const showRestaurantDetails = (restaurant) => {
  router.push({
    name: 'restaurant-details', // Ensure this route name matches your route definition
    params: { id: restaurant.id }
  });
};

onMounted(() => {
  initializeMap();
});
</script>
