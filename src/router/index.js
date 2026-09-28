import { createRouter, createWebHistory } from 'vue-router';
import Signup from '@/views/auth/Signup.vue';
import Login from '@/views/auth/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import NotFound from '@/views/NotFound.vue';
import { supabase } from '@/supabase';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound}
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
