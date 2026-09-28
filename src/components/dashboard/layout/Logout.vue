<template>
    <i @click="showConfirm = true" class="fa-solid fa-right-from-bracket fa-lg px-2 py-2 hover:scale-110 cursor-pointer transition"
        title="Logout"></i>
    <ConfirmModal v-model:open="showConfirm" title="Logout" message="Are you sure you want to logout?"
        confirmText="Logout" @confirm="logout" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";
import ConfirmModal from "@/components/ui/ConfirmModal.vue";

const router = useRouter();
const showConfirm = ref(false);

async function logout() {
    await supabase.auth.signOut();
    showConfirm.value = false;
    router.replace("/login");
}
</script>