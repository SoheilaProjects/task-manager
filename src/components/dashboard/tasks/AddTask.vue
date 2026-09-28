<template>
    <div @click.self="emit('close')"
        class="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
        <ErrorMessage v-if="errorMessage" :message="errorMessage" />
        <TaskForm mode="add" @close="emit('close')" @submit="addTask" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import TaskForm from './TaskForm.vue';
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import { useErrorHandler } from '@/composables/useErrorHandler';

const isLoading = ref(false);
const { errorMessage, handleError, clearError } = useErrorHandler();

const emit = defineEmits(['close', 'task-added']);

async function addTask(formData) {
    if (isLoading.value) return;

    isLoading.value = true;
    clearError();

    try {
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) throw userError;

        const user = userData?.user;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const { data, error } = await supabase
            .from('tasks')
            .insert([
                {
                    title: formData.title,
                    description: formData.description,
                    completed: false,
                    user_id: user.id,
                    scheduled_date: formData.scheduled_date,
                    due_date: formData.due_date

                }
            ])
            .select()
            .single();

        if (error) throw error;

        emit('task-added', data);
        emit('close');

    } catch (error) {
        handleError(error, 'Failed to add task.');
    } finally {
        isLoading.value = false;

    }
}
</script>