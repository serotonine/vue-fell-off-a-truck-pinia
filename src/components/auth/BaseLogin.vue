<script setup>
import { AUTH_ROLES } from "@/config";
import { capitalize } from "@/utils/utils";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
const auth = useAuthStore();
const router = useRouter();
const role = ref(null);
const error = ref("");

// Login.
const log = () => {
  if (role.value) {
    
    // AuthStore.
    auth.login(role.value);
    
    /* Handle case of direct access to /login */
    // router.back() => Same as router.go(-1);
   window.history.state?.back ?  router.back() : router.replace({name:'products-route'});
    
  } else {
    // Output in template.
    error.value = "Error...";
  }
};
</script>
<template>
  <h3>You need to be authentified to access your cart and favorites.</h3>
  <!-- <form @submit.prevent="log"> -->
    <fieldset>
      <legend>Authentification</legend>
      <select name="selectRole"  v-model.="role" @change="log">
        <option :value="null">Choose a role</option>
        <option v-for="role in AUTH_ROLES" :key="role" :value="role">{{ capitalize(role) }}</option>
      </select>
    </fieldset>
    <output>{{ error }}</output>
  <!-- </form> -->
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
