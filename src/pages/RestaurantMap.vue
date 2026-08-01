<template>
  <div class="map-container">
    <div id="map" style="height: 500px; width: 100%;" class="z-0"></div>
    
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

    <Alert v-if="locationError" class="error-alert" variant="destructive">
      <AlertCircle class="h-4 w-4" />
      <AlertDescription>
        {{ locationError }}
      </AlertDescription>
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { cravingIcons, cravingColors } from '@/services/constants';
import { onMounted, ref, shallowRef, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Navigation, Loader2, AlertCircle } from 'lucide-vue-next';
import type { Restaurant } from '@/types/types';

const props = defineProps<{ restaurants: Restaurant[] }>();

// State
// USE shallowRef FOR LEAFLET INSTANCES
const map = shallowRef<L.Map | null>(null);
const markersLayer = shallowRef<L.LayerGroup | null>(null);
const userLocationMarker = shallowRef<L.Marker | null>(null);
// Marqueurs indexés par id de restaurant, pour ne (re)créer que ce qui a changé.
const markersById = new Map<string, L.Marker>();

// Standard refs for data/UI state
const isLocating = ref(false);
const locationError = ref('');

watch(() => props.restaurants, (newRestaurants) => {
  if (map.value) {
    updateMarkers(newRestaurants);
  }
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
    maximumAge: 300000 
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      
      if (userLocationMarker.value) {
        map.value?.removeLayer(userLocationMarker.value);
      }

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

      userLocationMarker.value = L.marker([latitude, longitude], { icon: userIcon })
        .addTo(map.value!)
        .bindPopup('Votre position')
        .openPopup();

      map.value!.setView([latitude, longitude], 15);
      
      isLocating.value = false;
    },
    (error) => {
      isLocating.value = false;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationError.value = 'Autorisation de géolocalisation refusée.';
          break;
        default:
          locationError.value = 'Erreur de géolocalisation.';
          break;
      }
      setTimeout(() => { locationError.value = ''; }, 5000);
    },
    options
  );
};

// Crée un marqueur Leaflet pour un restaurant (icône colorée + popup lien Google Maps).
function createMarker(restaurant: Restaurant): L.Marker {
  const markerColor = cravingColors[restaurant.craving] || cravingColors.default;

  const iconHtml = `
    <div class="custom-marker-icon">
      <div class="icon-circle" style="background-color: ${markerColor}; border-color: #ffffff">
        <img src="${cravingIcons[restaurant.craving] || cravingIcons.default}" alt="${restaurant.craving}" />
      </div>
    </div>
  `;

  const markerIcon = L.divIcon({
    className: 'my-custom-leaflet-marker',
    html: iconHtml,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurant.name} ${restaurant.addresse}`
  )}`;
  const safeName = escapeHtml(restaurant.name);
  // Le lien <a target="_blank"> (navigation utilisateur réelle) remplace un ancien
  // window.open() sur un div, qui était bloqué/détourné par iOS (voir README/notes).
  const popupContent = `
    <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="custom-marker" aria-label="Ouvrir ${safeName} dans Google Maps">
      <div class="title">${safeName}</div>
      <img
        src="restaurant_pictures/${restaurant.id}-400.jpg"
        alt=""
        loading="lazy"
        decoding="async"
        onerror="this.onerror=null;this.src='/egg.svg'"
        class="popup-image"
      />
    </a>
  `;

  const marker = L.marker([restaurant.lat as number, restaurant.long as number], { icon: markerIcon });
  marker.bindPopup(popupContent);
  return marker;
}

// Réconcilie les marqueurs affichés avec la liste filtrée : n'ajoute que les
// nouveaux restaurants et ne retire que ceux qui ont disparu, au lieu de tout
// vider/reconstruire à chaque changement de filtre.
const updateMarkers = (restaurantsToDisplay: Restaurant[]) => {
  if (!map.value || !markersLayer.value) return;

  const nextIds = new Set<string>();

  restaurantsToDisplay.forEach((restaurant) => {
    if (restaurant.lat == null || restaurant.long == null) return;
    nextIds.add(restaurant.id);

    if (!markersById.has(restaurant.id)) {
      const marker = createMarker(restaurant);
      markersById.set(restaurant.id, marker);
      markersLayer.value!.addLayer(marker);
    }
  });

  for (const [id, marker] of markersById) {
    if (!nextIds.has(id)) {
      markersLayer.value!.removeLayer(marker);
      markersById.delete(id);
    }
  }
};

const initializeMap = () => {
  map.value = L.map('map').setView([48.8566, 2.3522], 12);

  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value);

  // Initialize the layer group
  markersLayer.value = L.layerGroup().addTo(map.value);

  updateMarkers(props.restaurants);
};

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
  margin-right: 10px;
  z-index: 10;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.error-alert {
  position: absolute;
  top: 60px;
  right: 10px;
  z-index: 11;
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
  text-decoration: none;
  color: inherit;
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
  width: 25px;
  height: 25px;
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
  filter: brightness(0) invert(1);
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