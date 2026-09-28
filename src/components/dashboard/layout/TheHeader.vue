<template>
    <header class="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-5 bg-blue-100 shadow">
        <div class="flex items-center gap-3">
            <img src="/app.svg" class="h-5 w-5" />
            <h1 class="text-xl font-semibold tracking-wider">Task Manager</h1>
        </div>
        <Logout />
    </header>
</template>

<script setup>
import Logout from './Logout.vue';

</script>