<template>
    <div class="flex flex-col items-center justify-center py-20 text-gray-500">
        <span class="text-5xl mb-4 bounce">📝</span>
        <p class="text-lg font-medium">No tasks yet</p>
        <p class="text-sm mt-1">Add your first task to get started</p>
    </div>
</template>

<style scoped>
.bounce {
    animation: float 2s ease-in-out infinite;
}
@keyframes float {
    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-6px);
    }
}
</style>