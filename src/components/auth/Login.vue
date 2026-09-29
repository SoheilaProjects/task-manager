<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <Transition name="auth" appear>
      <div class="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <h2 class="text-2xl font-bold text-center mb-4">Login</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <input v-model="email" type="email" placeholder="Email"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />

          <input v-model="password" type="password" placeholder="Password"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />

          <button :disabled="isLoading" type="submit"
            class="btn transition active:scale-95 disabled:opacity-60 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer">
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <Transition name="msg">
          <p v-if="error" class="text-red-600 mt-2 text-sm">{{ error }}</p>
        </Transition>
        <Transition name="msg">
          <p v-if="success" class="text-green-600 mt-2 text-sm">{{ success }}</p>
        </Transition>

        <p class="text-sm text-center mt-4">
          Don't have an account?
          <router-link to="/signup" class="text-blue-600 underline">Sign up</router-link>
        </p>
      </div>
    </Transition>
  </div>
</template>


<script setup>
import { supabase } from "@/supabase";
import { ref, Transition } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  error.value = '';
  success.value = '';
  isLoading.value = true;

  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields!!';
    isLoading.value = false;
    return;
  }

  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  isLoading.value = false;

  if (loginError) {
    error.value = loginError.message;
    return;
  }

  success.value = 'Login successful!';
  router.push('/dashboard');

  email.value = '';
  password.value = '';
};
</script>

<style scoped>
.auth-enter-active {
  transition: all 0.4s ease;
}
.auth-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}



.msg-enter-active {
  animation: fadeShake 0.4s;
}
@keyframes fadeShake {
  0% {
    opacity: 0;
    transform: translateY(-4px);
  }

  50% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>