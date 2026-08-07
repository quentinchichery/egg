<template>
  <DialogRoot :open="isOpen" @update:open="onUpdateOpen">
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />
      <DialogContent
        class="fixed inset-x-0 bottom-0 z-50 flex max-h-[90vh] max-h-[90dvh] flex-col rounded-t-2xl border-t bg-background shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
        @open-auto-focus.prevent
      >
        <div class="flex shrink-0 items-center justify-center pt-2">
          <div class="h-1.5 w-10 rounded-full bg-muted" />
        </div>
        <DialogTitle class="sr-only">Search filters</DialogTitle>
        <slot />
        <DialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'radix-vue';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: [] }>();

function onUpdateOpen(open: boolean) {
  if (!open) emit('close');
}
</script>