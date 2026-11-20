<script setup>
import posts from "@/data/posts.json";
//import { useBlogStore } from '@/stores/blog.store';
import BaseBlog from "./BaseBlog.vue";
import { onMounted } from "vue";
// const blog = useBlogStore();
onMounted(() => console.log(posts));
</script>
<template>
  <section class="wrapper">
    <base-blog
      v-for="post in posts"
      :key="post.id"
      :complete="false"
      :post="post"
    ></base-blog>
  </section>
</template>
<style scoped>
@media screen and (min-width: 645px) {
  .wrapper {
    display: grid;
    gap:1rem;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
