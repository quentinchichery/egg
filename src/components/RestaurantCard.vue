<template>
  <div class="thumbnail" @click="navigateToLink(restaurant)">
    <div class="caption">
      {{ restaurant.name }}
    </div>
    <img :src="'restaurant_pictures/' + restaurant.id + '.jpg'"/>
  </div> 
</template>

<script setup>
const props = defineProps({
  restaurant: Object,
});

function navigateToLink(restaurant) {
  const fullUrl = `https://www.google.com/search?q=${encodeURIComponent(restaurant.name)}+${encodeURIComponent(restaurant.addresse)}`;
  window.open(fullUrl, '_blank');
}
</script>

<style scoped>
img {
  display: block;
  height:400px;
  width:400px;
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
  transform: translate( -50%, -50% );
  text-align: center;
  color: white;
  font-weight: bold;
  background-color: #454545;
  padding: 7px;
}
</style>
