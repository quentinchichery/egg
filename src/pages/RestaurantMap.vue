<template>
  <div class="map-container">
    <div id="map" style="height: 500px; width: 100%;" class="z-0"></div>
    
    <!-- Locate Me Button -->
    <Button 
      @click="locateUser" 
      :disabled="isLocating"
      variant="outline"
      size="sm"
      class="locate-button"
    >
      <Navigation v-if="!isLocating" class="w-4 h-4 mr-2" />
      <Loader2 v-else class="w-4 h-4 mr-2 animate-spin" />
      {{ isLocating ? 'Localisation...' : 'Me localiser' }}
    </Button>

    <!-- Error message -->
    <Alert v-if="locationError" class="error-alert" variant="destructive">
      <AlertCircle class="h-4 w-4" />
      <AlertDescription>
        {{ locationError }}
      </AlertDescription>
    </Alert>
  </div>
</template>

<script setup>
import { cravingIcons } from '@/services/constants';
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Navigation, Loader2, AlertCircle } from 'lucide-vue-next';

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
const userLocationMarker = ref(null); // User location marker
const isLocating = ref(false);
const locationError = ref('');

watch(() => props.restaurants, (newRestaurants) => {
  console.log('Restaurant list updated, redrawing markers...');
  if (map.value) {
    updateMarkers(newRestaurants);
  }
});

// Function to locate user
const locateUser = () => {
  if (!navigator.geolocation) {
    locationError.value = 'La géolocalisation n\'est pas supportée par ce navigateur.';
    return;
  }

  isLocating.value = true;
  locationError.value = '';

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000 // 5 minutes
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      
      // Remove previous user location marker
      if (userLocationMarker.value) {
        map.value.removeLayer(userLocationMarker.value);
      }

      // Create user location marker with different style
      const userIcon = L.divIcon({
        className: '', 
        html: `
          <div class="user-location-marker">
            <div class="pulse-ring"></div>
            <div class="user-dot"></div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      // Add user location marker
      userLocationMarker.value = L.marker([latitude, longitude], { icon: userIcon })
        .addTo(map.value)
        .bindPopup('Votre position')
        .openPopup();

      // Center map on user location with appropriate zoom
      map.value.setView([latitude, longitude], 15);
      
      isLocating.value = false;
    },
    (error) => {
      isLocating.value = false;
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          locationError.value = 'Autorisation de géolocalisation refusée.';
          break;
        case error.POSITION_UNAVAILABLE:
          locationError.value = 'Position non disponible.';
          break;
        case error.TIMEOUT:
          locationError.value = 'Délai de géolocalisation dépassé.';
          break;
        default:
          locationError.value = 'Erreur de géolocalisation.';
          break;
      }
      
      // Hide error after 5 seconds
      setTimeout(() => {
        locationError.value = '';
      }, 5000);
    },
    options
  );
};


// Function to update markers (using the optimized method)
const updateMarkers = (restaurantsToDisplay) => {
  if (!map.value || !markersLayer.value) return;

  // Clear only the markers, not the whole map
  markersLayer.value.clearLayers();

  restaurantsToDisplay.forEach(restaurant => {
    if (restaurant.lat != null && restaurant.long != null) {
      const iconHtml = `
        <div class="custom-marker-icon">
          <div class="icon-circle">
            <img src="${cravingIcons[restaurant.craving] || cravingIcons.default}" alt="${restaurant.craving}" />
          </div>
        </div>
      `;
      const markerIcon = L.divIcon({
        // Use a specific class name for the container
        className: 'my-custom-leaflet-marker', 
        html: iconHtml,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });

      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(restaurant.name)}+${encodeURIComponent(restaurant.addresse)}`;
      const popupContent = `
        <div class="custom-marker" style="cursor: pointer;">
          <div class="title">${restaurant.name}</div>
          <img src="restaurant_pictures/${restaurant.id}.jpg" class="popup-image"/>
        </div>
      `;
      
      const marker = L.marker([restaurant.lat, restaurant.long], { icon: markerIcon });
      
      // We bind the popup and add the click listener inside its 'open' event
      marker.bindPopup(popupContent).on('popupopen', (e) => {
        const popupNode = e.popup.getElement().querySelector('.custom-marker');
        if (popupNode) {
          popupNode.addEventListener('click', () => window.open(googleSearchUrl, '_blank'));
        }
      });

      // Add the new marker to our layer group
      markersLayer.value.addLayer(marker);
    }
  });
};

// Function to initialize the map
const initializeMap = () => {
  map.value = L.map('map').setView([48.8566, 2.3522], 12);

  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value);

  // Initialize the layer group once
  markersLayer.value = L.layerGroup().addTo(map.value);

  // Initial drawing of markers
  updateMarkers(props.restaurants);
};

// 3. SET UP ON MOUNT
// When the component is ready, initialize the map.
onMounted(() => {
  initializeMap();
});
</script>

<style scoped>
.map-container {
  position: relative;
}

.locate-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.error-alert {
  position: absolute;
  top: 60px;
  right: 10px;
  z-index: 1000;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

:deep(.custom-marker) {
  width: 200px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: black;
}

:deep(.custom-marker img) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

:deep(.title) {
  position: absolute;
  z-index: 2;
  color: white;
  font-weight: bold;
  background-color: #454545; 
  text-align: center;
}

:deep(.my-custom-leaflet-marker .icon-circle) {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid #cccccc;
  
  /* Add this to prevent global box-sizing rules from interfering */
  box-sizing: content-box !important;
}

:deep(.my-custom-leaflet-marker .icon-circle img) {
  width: 60%;
  height: 60%;
  object-fit: contain;
}

/* User location marker styles */
:deep(.user-location-marker) {
  position: relative;
  width: 20px;
  height: 20px;
}

:deep(.pulse-ring) {
  content: '';
  width: 20px;
  height: 20px;
  border: 2px solid #4285f4;
  border-radius: 50%;
  background-color: rgba(66, 133, 244, 0.1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: pulsate 2s ease-out infinite;
}

:deep(.user-dot) {
  width: 8px;
  height: 8px;
  background-color: #4285f4;
  border: 2px solid white;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 1px rgba(66, 133, 244, 0.3);
}

@keyframes pulsate {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}
</style>