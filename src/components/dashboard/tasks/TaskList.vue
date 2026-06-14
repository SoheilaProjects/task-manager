<template>
    <div class="px-5 py-8 space-y-8">
        <div v-for="group in groupedTasks" :key="group.title">
            <h2 class="mb-4 text-sm font-semibold text-gray-500 tracking-wide">{{ group.title }}</h2>
            <TransitionGroup name="task" tag="div"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TaskCard v-for="(task, index) in group.tasks" :key="task.id" :task="task"
                    :style="{ transitionDelay: `${index * 60}ms` }" @delete="$emit('delete', $event)"
                    @edit="$emit('edit', $event)" @toggle="handleToggle" />
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup>
import { supabase } from '@/supabase';
import { computed } from 'vue';
import TaskCard from './TaskCard.vue';
import { getTaskGroupTitle, getGroupPriority } from '@/utils/date.js';

const props = defineProps({
    tasks: {
        type: Array,
        required: true
    }
});

defineEmits(['edit', 'delete', 'toggle']);

const handleToggle = async ({ id, completed }) => {
    const task = props.tasks.find(t => t.id === id);

    if (!task) return;

    const { error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', id);

    if (!error) {
        task.completed = completed;
    }
};

const groupedTasks = computed(() => {
    const groups = [];

    props.tasks.forEach((task) => {
        const groupTitle = getTaskGroupTitle(task.scheduled_date);

        let group = groups.find(g => g.title === groupTitle);

        if (!group) {
            group = {
                title: groupTitle,
                priority: getGroupPriority(task.scheduled_date),
                date: task.scheduled_date,
                tasks: []
            };

            groups.push(group);
        }

        group.tasks.push(task);
    });

    groups.sort((a, b) => {
        if (a.priority !== b.priority) {
            return a.priority - b.priority;
        }

        return new Date(a.date) - new Date(b.date);
    });

    return groups;
});

</script>

<style scoped>
.task-enter-active,
.task-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

.task-enter-from,
.task-leave-to {
    opacity: 0;
    transform: translateY(12px);
}

.task-move {
    transition: transform 0.3s ease;
}
</style>