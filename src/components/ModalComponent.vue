<!-- ModalComponent.vue -->
<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
        <div class="slot">
          <slot></slot>
        </div>
        <div class="close">
          <Button type="button" @click="closeModal">Close</Button>
        </div>
    </div>
  </div>


</template>

<script setup>
const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure the modal is on top */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh; /* Set a maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
  width: 90%; /* Adjust width as needed */
  max-width: 500px; /* Set a maximum width */
}

.slot {
  display: flex;
  justify-content: center;
}

.close {
  display: flex;
  justify-content: center;
}

</style>