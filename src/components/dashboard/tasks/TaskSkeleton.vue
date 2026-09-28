<template>
    <div v-for="i in count" :key="i" class="p-4 rounded-xl bg-gray-200 animate-pulse h-[180px]">
        <div class="h-4 rounded bg-gray-300 w-3/4 mb-4"></div>
        <div class="h-4 rounded bg-gray-300 w-full mb-2"></div>
        <div class="h-4 rounded bg-gray-300 w-5/6"></div>
    </div>
</template>

<script setup>
defineProps({
    count: {
        type: Number,
        default: 6
    }
});
</script>