<template>
    <div class="flex flex-row flex-wrap gap-3 justify-start items-start m-5">

        <!--Filters-->
        <div class="flex flex-wrap gap-2">
            <button v-for="item in filters" :key="item.value" @click="selectFilter(item.value)" :class="['px-3 py-1 cursor-pointer rounded transition-all duration-200',
                activeFilter === item.value ? 'bg-gray-600 text-white scale-105 shadow' :
                    'bg-gray-300 hover:bg-gray-400 hover:scale-105']">
                {{ item.label }}
            </button>
        </div>

        <!-- Search & add -->
        <div class="flex items-start gap-3">

            <!-- Search -->
            <div class="search-container relative h-8 transition-[width] duration-300 ease-in-out"
                :class="showSearch ? 'w-45 overflow-hidden' : 'w-9 overflow-visible'">

                <!-- search input -->
                <Transition name="search">
                    <div v-if="showSearch" class="absolute left-0 top-0 w-45">
                        <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search tasks..." class="w-full px-3 h-8 pr-9 rounded-lg border border-gray-300 focus:outline-none 
                        focus:ring-2 focus:ring-blue-300" @click.stop @input="emit('search-change', searchQuery)" />

                        <button type="button" @click.stop="clearSearch" class="absolute right-2 top-1/2 
                        -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer transition-transform
                         duration-200 hover:scale-110" title="Clear search">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <!-- search icon -->
                    <button v-else type="button" @click.stop="openSearch" class="w-9 h-8 rounded-full shadow bg-gray-300
                     hover:bg-gray-400 transition-all duration-200 hover:scale-115 cursor-pointer"
                        title="Search tasks">
                        <i class="fa-solid fa-magnifying-glass text-gray-700"></i>
                    </button>
                </Transition>
            </div>
            <!-- Add -->
            <i @click="emit('add-modal')" class="fa-solid fa-plus text-white px-3 py-2 bg-blue-400 rounded-full transition-all duration-200 
                hover:bg-blue-500 hover:scale-115 active:scale-95 active:bg-blue-600 cursor-pointer"
                title="Add New Task"></i>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['add-modal', 'filter-change', 'search-change']);

const activeFilter = ref('all');
const showSearch = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);

const filters = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' }
];

function selectFilter(filter) {
    activeFilter.value = filter;
    emit('filter-change', filter);
}

async function openSearch() {
    showSearch.value = true;

    await nextTick();

    searchInput.value?.focus();
}

function clearSearch() {
    searchQuery.value = '';
    emit('search-change', '');
}

function handleClickOutside(event) {
    if (!showSearch.value) return;

    const searchElement = event.target.closest('.search-container');

    if (!searchElement && !searchQuery.value.trim()) {
        showSearch.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>

<style scoped>
.search-enter-active,
.search-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.search-enter-from,
.search-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>