<script setup>
import { useTemplateRef, onMounted } from "vue";
import { useRouter } from "vue-router";
import CloseBtn from "@/components/buttons/BaseCloseBtn.vue";
const dialog = useTemplateRef("dialog");
const router = useRouter();
// Set public.
defineExpose({ closeDialog });

onMounted(() => {
  dialog.value.showModal();
});

function closeDialog() {
  dialog.value.close();
  router.back();
}
</script>
<template>
  <Teleport to="main">
    <dialog ref="dialog">
      <header class="blog-edit-form_header">
        <close-btn @click="closeDialog"></close-btn>
      </header>
      <slot></slot>
    </dialog>
  </Teleport>
</template>
