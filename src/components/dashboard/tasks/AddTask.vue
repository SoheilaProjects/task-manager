<template>
    <div @click.self="$emit('close')"
        class="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
        <TaskForm mode="add" @close="emit('close')" @submit="addTask" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import TaskForm from '@/components/ui/TaskForm.vue';

const isLoading = ref(false);

const emit = defineEmits(['close', 'task-added']);

async function addTask(formData) {
    if (isLoading.value) return;
    isLoading.value = true;

    const { data, error } = await supabase
        .from('tasks')
        .insert([
            {
                title: formData.title,
                description: formData.description,
                completed: false,
                user_id: (await supabase.auth.getUser()).data.user.id,
                scheduled_date: formData.scheduled_date,
                due_date: formData.due_date

            }
        ])
        .select()
        .single();

    isLoading.value = false;

    if (!error && data) {
        emit('task-added', data);
    }

    emit('close');
}
</script>