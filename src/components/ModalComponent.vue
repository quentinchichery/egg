<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <Button type="button" variant="ghost" @click="closeModal">
          <XIcon class="w-4 h-4 mr-2" /> fermer
        </Button>
      </div>
        <div class="slot">
          <slot></slot>
        </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-vue-next';

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
  height: 90vh;
  overflow-y: auto; /* Enable vertical scrolling */
  max-width: 500px; /* Set a maximum width */
}

.modal-header {
  display: flex;
  justify-content: flex-end;
}
</style>