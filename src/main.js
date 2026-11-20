import './assets/styles.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {createRouter, createWebHashHistory} from 'vue-router';
import {routes} from './routes';
import App from './App.vue';
import { useAuthStore } from '@/stores/auth.store';
// Router.
const router = createRouter({
  routes,
  history:createWebHashHistory()
});
// Navigation guards.
router.beforeEach((to,from)=>{
  if(to.meta.requireAuth){
    const authStore = useAuthStore();
    if(!authStore.isAuthenticated){
      /* If anonymous redirect to login page then redirect to page Source (cart, favorite). */
       return { name: 'login-route', query: { redirect: to.fullPath } }
    }
  }
});

// Stores.
const pinia = createPinia();

createApp(App)
.use(router)
.use(pinia)
.mount('#app');
