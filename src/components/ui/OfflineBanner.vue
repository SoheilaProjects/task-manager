<template>
    <div v-if="visible" class="fixed bottom-0 left-0 right-0 z-40 text-white text-center py-2"
        :class="offline ? 'bg-black ' : 'bg-blue-500'">
        {{ offline ? 'No internet connection' : 'Back online' }}
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const offline = ref(!navigator.onLine);
const visible = ref(!navigator.onLine);
let timeoutId;

const updateStatus = () => {
    clearTimeout(timeoutId);

    if (!navigator.onLine) {
        offline.value = true;
        visible.value = true;
    } else {
        offline.value = false;
        visible.value = true;

        timeoutId = setTimeout(() => {
            visible.value = false;
        }, 3000);
    }
};

onMounted(() => {
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
});

onUnmounted(() => {
    window.removeEventListener('online', updateStatus);
    window.removeEventListener('offline', updateStatus);
    clearTimeout(timeoutId);
});
</script>