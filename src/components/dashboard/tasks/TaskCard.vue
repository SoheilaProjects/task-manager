<template>
    <div class="p-4 rounded-xl shadow-md flex flex-col min-h-[180px]
      transition-all duration-300 ease-out hover:shadow-xl group"
        :class="[task.completed ? 'bg-white/80' : 'bg-white hover:-translate-y-1', justCompleted && 'animate-complete']">
        <div class="flex-1">
            <div class="flex justify-between items-start">
                <h2 class="font-semibold text-lg text-blue-900 line-clamp-2 wrap-break-word
                transition-all duration-300"
                    :class="task.completed ? 'line-through text-gray-400 opacity-70' : 'group-hover:text-xl'">
                    {{ task.title }}</h2>

                <input type="checkbox"
                    class="w-5 h-5 mt-1.5 shrink-0 cursor-pointer transition-transform duration-200 checked:scale-110"
                    :checked="task.completed" @change="onToggle">
            </div>
            <p class="text-sm mt-2 transition-all duration-300
                 line-clamp-3 wrap-break-word"
                :class="task.completed ? 'text-gray-500 opacity-60' : 'text-gray-600 group-hover:text-base'">
                {{ task.description }}</p>

            <div v-if="task.due_date" class="tracking-wide text-sm mt-2 transition-all duration-300"
                :class="task.completed ? 'text-gray-500 opacity-60' : [dueClass, 'font-semibold group-hover:text-base']">
                {{ dueText }}
            </div>
        </div>
        <div class="flex justify-end items-center mt-auto space-x-2
        group-hover:opacity-100 transition-opacity" :class="task.completed ? 'opacity-40' : 'opacity-80 '">
            <div class="w-8 h-8 flex items-center justify-center">
                <i @click.stop="emit('edit', task)" title="Edit Task" class="fa-solid fa-pen
                 text-blue-900 px-2 py-1 transition-transform hover:scale-110 cursor-pointer"></i>
            </div>
            <div class="w-8 h-8 flex items-center justify-center">
                <DeleteTask :taskId="task.id" @delete="emit('delete', task.id)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import DeleteTask from './DeleteTask.vue';
import { getDueStatus, formatDate } from '@/utils/date.js';

const justCompleted = ref(false);

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['edit', 'delete', 'toggle']);

let timoutId;
watch(
    () => props.task.completed,
    (val) => {
        if (val) {
            justCompleted.value = true;

            clearTimeout(timoutId);

            timoutId = setTimeout(() => {
                justCompleted.value = false;
            }, 300);
        }
    }
);

const onToggle = () => {
    emit('toggle', {
        id: props.task.id,
        completed: !props.task.completed
    });
};

const dueStatus = computed(() =>
    getDueStatus(props.task.due_date)
);

const dueText = computed(() => {
    if (!props.task.completed) {
        if (dueStatus.value === 'overdue') return '❗ Overdue';
        if (dueStatus.value === 'today') return '⌛ Due today';
    }
    return props.task.due_date ? `🎯 Due ${formatDate(props.task.due_date)}` : '';
});

const dueClass = computed(() => {
    if (dueStatus.value === 'overdue') return 'text-red-600';
    if (dueStatus.value === 'today') return 'text-orange-600';
    return 'text-gray-600';
});

</script>

<style scoped>
.animate-complete {
    animation: complete 0.25s ease-out;
}

@keyframes complete {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.015);
    }

    100% {
        transform: scale(1);
    }
}
</style>