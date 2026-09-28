<template>
  <Teleport to="body">
    <div class="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm flex items-center gap-3 px-4 py-3
           rounded-lg bg-red-50 border border-red-200 text-red-700 shadow-md">
      <i class="fa-solid fa-circle-exclamation"></i>

      <p class="text-sm font-medium flex-1">
        {{ message }}
      </p>

      <button v-if="showRetry" @click="emit('retry')"
        class="text-sm font-semibold underline hover:no-underline cursor-pointer">
        Try again</button>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'An unexpected error occurred.'
  },
  showRetry: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['retry']);
</script>