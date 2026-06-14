<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="open" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                @click.self="$emit('update:open', false)">
                <div class="bg-white p-6 rounded-xl w-80">
                    <h3 class="font-semibold text-lg mb-3 text-black">{{ title }}</h3>
                    <p class="text-gray-600 mb-6"> {{ message }}</p>
                    <div class="flex justify-end gap-2">
                        <button @click="$emit('update:open', false)"
                            class="px-4 py-2 text-black bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
                            Cancel
                        </button>
                        <button @click="$emit('confirm')"
                            class="btn px-4 py-2 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600">
                            {{ confirmText }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const open = defineModel('open');

defineProps({
    title: String,
    message: String,
    confirmText: {
        type: String,
        default: 'Confirm'
    }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>