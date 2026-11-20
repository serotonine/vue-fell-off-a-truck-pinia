<script setup>
import { useBlogStore } from '@/stores/blog.store';
const props = defineProps({
  tag: { type: String, required: true },
});
const blogStore = useBlogStore();
const bgColor = blogStore.tagsColor.has(props.tag) ? blogStore.tagsColor.get(props.tag) : '#000';
</script>

<template>
  <!--  query: { limit: 15, sortBy: 'views', order: 'desc' }, -->
  <router-link
    :to="{
      name: 'blog-route',
      params: { tag },
    }"
  >
    <button class="btn btn-post-tag">
      {{ tag }}
    </button>
  </router-link>
</template>
<style scoped>
.btn-post-tag{
  --current-color: v-bind(bgColor);
  border:none;
  background-color: var(--current-color);
  opacity:0.8;
  transition: opacity 0.1s linear;
  &:hover{
    opacity: 1;
  }
}
</style>
