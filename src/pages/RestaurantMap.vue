<template>
  <div>
    <div id="map" style="height: 500px; width: 100%;" class="z-0"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = L.icon({
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, 0],
  iconUrl: '/egg/location.png',
});

// Props
const props = defineProps({
  restaurants: {
    type: Array,
    required: true
  }
});

// State
const map = ref(null);
const selectedRestaurant = ref(null);
const markers = ref([]);
const center = [48.8566, 2.3522];
const zoom = 12;
const markersLayer = ref(null); // LayerGroup for markers

// Watch for changes in restaurants and reinitialize the map
watch(
  () => props.restaurants,
  () => {
    if (map.value) {
      reinitializeMap(); // Reinitialize map on filtering
    }
  },
  { immediate: true }
);

// Function to reinitialize the map
const reinitializeMap = () => {
  if (map.value) {
    map.value.remove(); // Completely destroy the map instance
    map.value = null;
  }
  initializeMap(); // Recreate the map
};

// Function to initialize map and add markers
const initializeMap = () => {
  map.value = L.map('map').setView([48.8566, 2.3522], 12);

  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value);

  addMarkers();
};

// Function to add markers
const addMarkers = () => {
  if (!map.value) return;

  // Remove previous marker layer
  if (markersLayer.value) {
    markersLayer.value.clearLayers();
  } else {
    markersLayer.value = L.layerGroup().addTo(map.value);
  }

  props.restaurants.forEach(restaurant => {
    if (restaurant.lat != null && restaurant.long != null) {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(restaurant.name)}+${encodeURIComponent(restaurant.addresse)}`;
      const popupContent = `
        <div class="custom-marker">
          <div class="title">${restaurant.name}</div>
          <img src="/egg/restaurant_pictures/${restaurant.id}.jpg" class="popup-image"/>
        </div>
      `;
      const marker = L.marker([restaurant.lat, restaurant.long], {icon : markerIcon}).addTo(map.value);
      marker.bindPopup(popupContent);
      // Add event listener to make the popup clickable
      marker.on('popupopen', e => {
        const popupNode = e.popup.getElement();
        const contentNode = popupNode.querySelector('.custom-marker');
        if (contentNode) {
          contentNode.addEventListener('click', () => {
            window.open(googleSearchUrl, '_blank');
          });
        }
      });
      // Add marker to the array
      markers.value.push(marker);
    }
  });
}
          // <br>
          // <a href="${googleSearchUrl}" target="_blank">Lien Google</a>

onMounted(() => {
  initializeMap();
});
</script>

<style scoped>
:deep(.custom-marker) {
  width: 200px; /* Make the popup take all available width */
  height: 250px; /* Make the popup take all available height */
  display: flex; /* Flexbox to help align children */
  justify-content: center; /* Center title horizontally */
  align-items: center; /* Center title vertically */
  position: relative; /* Positioning context for the title */
  overflow: hidden; /* Ensure no content spills outside */
  cursor: pointer; /* Indicate interactivity */
  background-color: black; /* Fallback background in case the image fails to load */
}

:deep(.custom-marker img) {
  position: absolute; /* Fill the parent container */
  top: 0;
  left: 0;
  width: 100%; /* Stretch the image to full width */
  height: 100%; /* Stretch the image to full height */
  object-fit: cover; /* Ensure the image covers the container */
  z-index: 1; /* Place the image behind the title */
}

:deep(.title) {
  position: absolute; /* Overlay the title on top of the image */
  z-index: 2; /* Ensure the title is above the image */
  color: white;
  font-weight: bold;
  background-color: #454545; 
  text-align: center; /* Center text horizontally */
}
</style>