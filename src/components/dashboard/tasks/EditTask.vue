<template>
    <div @click.self="emit('close')" class="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
        <TaskForm mode="edit" :task="props.task" @close="emit('close')" @submit="editTask" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import TaskForm from '@/components/ui/TaskForm.vue';

const props = defineProps({
    task: Object
});

const emit = defineEmits(['edit', 'close']);

const isLoading = ref(false);

async function editTask(formData) {
    if (isLoading.value) return;
    isLoading.value = true;

    const { data, error } = await supabase
        .from('tasks')
        .update([
            {
                title: formData.title,
                description: formData.description,
                scheduled_date: formData.scheduled_date,
                due_date: formData.due_date
            }
        ])
        .eq('id', props.task.id)
        .select()
        .single();

    isLoading.value = false;

    if (!error && data) {
        emit('edit', data);
    }

    emit('close');
}

</script>