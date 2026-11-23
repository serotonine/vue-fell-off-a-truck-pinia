/*
 * ref => state,
 * computed => getters,
 * functions => actions.
 * Must return everything.
 */

// COMPOSITION API //
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // State.
  const user = ref(null);

  // Getters.
  const isAuthenticated = computed(() => !!user.value);

  // Actions.
  const login = (username) => {
    user.value = {
      name: username,
      role: username,
    };
  };

  const logout = () => {
    user.value = null;
  };

  /*  console.info("useAuthStore : ", user.value.name); */

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
});
