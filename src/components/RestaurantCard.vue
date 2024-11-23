<template>
  <div class="thumbnail" @click="onClick">
    <div class="caption">
      {{ restaurant.name }}
    </div>
    <img :src="'restaurant_pictures/' + restaurant.id + '.jpg'"/>
  </div> 
</template>

<script setup lang="ts">
const props = defineProps({
  restaurant: Object,
});

const emit = defineEmits(['click']);

const onClick = () => {
    emit('click', props.restaurant);
  };

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
}
</style>
