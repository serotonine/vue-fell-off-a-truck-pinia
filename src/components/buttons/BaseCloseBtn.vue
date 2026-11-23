<script setup>
import { X, Trash } from "@lucide/vue";
defineProps({ trash: { type: Boolean, required: false } });
</script>
<template>
  <button v-if="trash" type="button" class="btn btn-cta btn-close"><Trash></Trash></button>
  <button v-else type="button" class="btn btn-cta btn-close"><X></X></button>
</template>
