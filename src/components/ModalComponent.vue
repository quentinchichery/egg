<template>
  <Dialog :open="isOpen" @update:open="onUpdateOpen">
    <DialogContent class="modal-dialog-content">
      <DialogTitle class="sr-only">Filtres de recherche</DialogTitle>
      <slot />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: [] }>();

function onUpdateOpen(open: boolean) {
  if (!open) emit('close');
}
</script>

<style scoped>
.modal-dialog-content {
  max-height: 90vh;
  overflow-y: auto;
}
</style>