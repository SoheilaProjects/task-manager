<template>
    <div @click.self="emit('close')"
        class="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
        <ErrorMessage v-if="errorMessage" :message="errorMessage" />
        <TaskForm mode="edit" :task="props.task" @close="emit('close')" @submit="editTask" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import TaskForm from './TaskForm.vue';
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import { useErrorHandler } from '@/composables/useErrorHandler.js';

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['edit', 'close']);

const isLoading = ref(false);
const { errorMessage, handleError, clearError } = useErrorHandler();

async function editTask(formData) {
    if (isLoading.value) return;

    isLoading.value = true;
    clearError();

    try {
        const { data, error } = await supabase
            .from('tasks')
            .update({
                title: formData.title,
                description: formData.description,
                scheduled_date: formData.scheduled_date,
                due_date: formData.due_date
            })
            .eq('id', props.task.id)
            .select()
            .single();

        if (error) throw error;

        emit('edit', data);
        emit('close');

    } catch (error) {
        handleError(error, 'Failed to update task.');
    } finally {
        isLoading.value = false;
    }
}
</script>