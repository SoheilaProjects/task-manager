<template>
    <i @click.stop="showConfirmModal = true"
        class="fa-solid fa-trash-can text-blue-900 px-2 py-1 hover:scale-110 cursor-pointer" title="Delete Task"></i>
    <ConfirmModal v-model:open="showConfirmModal" title="Delete Task" message="Are you sure you want to delete this task?"
        confirmText="Delete" @confirm="confirmDelete" />
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';

const props = defineProps({
    taskId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['delete']);

const isLoading = ref(false);
const showConfirmModal = ref(false);

async function confirmDelete() {
    if (isLoading.value) return;
    isLoading.value = true;

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', props.taskId);

    isLoading.value = false;

    if (!error) {
        emit('delete', props.taskId);
    }
    showConfirmModal.value = false;
}
</script>