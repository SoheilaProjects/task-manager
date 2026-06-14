<template>
    <div class="flex flex-row flex-wrap gap-3 justify-start items-start m-5">
        <div class="flex flex-wrap gap-2">
            <button v-for="item in filters" :key="item.value" @click="selectFilter(item.value)" :class="['px-3 py-1 cursor-pointer rounded transition-all duration-200',
                activeFilter === item.value ? 'bg-gray-600 text-white scale-105 shadow' : 'bg-gray-300 hover:bg-gray-400 hover:scale-105']">
                {{ item.label }}
            </button>
        </div>
        <i @click="emit('add-modal')"
            class="fa-solid fa-plus text-white px-4 py-2 bg-blue-400 rounded-lg transition-all duration-200 hover:bg-blue-500 hover:scale-110 active:scale-95 active:bg-blue-600 cursor-pointer"
            title="Add New Task"></i>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-modal', 'filter-change']);

const activeFilter = ref('all');

const filters = ref([
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' }
])

function selectFilter(filter) {
    activeFilter.value = filter;
    emit('filter-change', filter);
}
</script>
