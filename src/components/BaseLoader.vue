<script setup>
import { LoaderPinwheel } from "@lucide/vue";
defineProps(["error", "isLoading"]);
</script>
<template>
  <LoaderPinwheel v-if="isLoading" :size="60"></LoaderPinwheel>
  <h3 v-if="error" class="error">Error: {{ error }}</h3>
</template>

