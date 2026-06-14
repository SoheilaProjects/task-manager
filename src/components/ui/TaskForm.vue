<template>
    <div class="bg-white/95 backdrop-blur border border-gray-100 rounded-xl p-6 w-11/12 max-w-md relative animate-form">
        <i @click="$emit('close')"
            class="fa-solid fa-xmark absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-black hover:rotate-90 transition-transform duration-200"></i>
        <h2 class="text-xl font-bold mb-6 text-center">{{ mode === 'add' ? 'Add New Task' : 'Edit Task' }}</h2>

        <input v-model="form.title" type="text" placeholder="Add title"
            class="w-full p-2 border border-gray-200 rounded mb-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition" />

        <textarea v-model="form.description" placeholder="Add description" rows="4"
            class="w-full p-2 mb-4 border border-gray-200 rounded focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"></textarea>

        <label class="block text-sm font-medium mb-1 text-gray-500">
             Scheduled Date
        </label>
        <input v-model="form.scheduled_date" type="date"
            class="w-full p-2 border border-gray-200 rounded mb-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition">

        <label class="block text-sm font-medium mb-1 text-gray-500">
             Deadline
        </label>
        <input v-model="form.due_date" type="date"
            class="w-full p-2 border border-gray-200 rounded mb-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition">

        <button @click="submit" :disabled="isTitleEmpty"
            :class="['w-full rounded-full p-3 text-white transition transform',
                isTitleEmpty ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 cursor-pointer']">
            {{ mode === 'add' ? 'Add Task' : 'Save' }}
        </button>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { getToday } from '../../utils/date';

const props = defineProps({
    mode: {
        type: String,
        required: true
    },
    task: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['close', 'submit']);

const form = ref({
    title: '',
    description: '',
    scheduled_date: '',
    due_date: ''
});

const dateInput = ref(null);

watch(
    () => props.task,
    (task) => {
        if (props.mode === 'edit' && task) {
            fillForm(task);
        }
        if (props.mode === 'add') {
            resetForm();
        }
    },
    { immediate: true }
);

const isTitleEmpty = computed(() => !form.value.title.trim());

function fillForm(task) {
    form.value = {
        title: task.title,
        description: task.description,
        scheduled_date: task.scheduled_date || getToday(),
        due_date: task.due_date || ''
    };
}

function resetForm() {
    form.value = {
        title: '',
        description: '',
        scheduled_date: getToday(),
        due_date: ''
    };
}

function submit() {
    if (isTitleEmpty.value || !form.value.scheduled_date)
        return;

    const payload = {
        ...form.value,
        due_date: form.value.due_date || null
    };

    emit('submit', payload);
}

</script>

<style scoped>
@keyframes formIn {
    from {
        opacity: 0;
        transform: scale(0.96) translateY(10px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.animate-form {
    animation: formIn 0.25s ease-out;
}
</style>