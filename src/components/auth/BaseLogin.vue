<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
const auth = useAuthStore();
const router = useRouter();
const username = ref("");
const error = ref("");

// Login.
const log = () => {
  if (username.value) {
    
    // AuthStore.
    auth.login(username.value);
    
    /* Handle case of direct access to /login */
    // router.back() => Same as router.go(-1);
   window.history.state?.back ?  router.back() : router.replace({name:'products-route'});
    
  } else {
    // Output in template.
    error.value = "Error : check your input";
  }
};
</script>
<template>
  <form @submit.prevent="log">
    <fieldset>
      <legend>Authentification</legend>
      <label>
        <span class="label">Username</span>
        <input
          type="text"
          required
          placeholder="username"
          name="username"
          autocomplete="username"
          v-model.trim="username"
        />
      </label>
      <button type="submit" class="btn btn-cta">Login</button>
    </fieldset>
    <output>{{ error }}</output>
  </form>
</template>

<style scoped>
form {
  width: max-content;
  margin: 0 auto;
  button {
    margin-left: 0.5em;
  }
}
</style>
