import { createRouter, createWebHistory } from 'vue-router';
import Signup from '@/components/auth/Signup.vue';
import Login from '@/components/auth/Login.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import { supabase } from '@/supabase';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session && to.name === 'Dashboard') {
    return next({ name: 'Login' });
  }

  if (session && (to.name === 'Login' || to.name === 'Signup')) {
    return next({ name: 'Dashboard' });
  }

  next();
});

export default router;
