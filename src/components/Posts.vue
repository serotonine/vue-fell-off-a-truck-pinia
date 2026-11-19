<script>
import { usePostStore } from "@/stores/post.store.js";
import Post from "./Post.vue";
import BaseLoader from "./BaseLoader.vue";

export default {
  
  components: { Post, BaseLoader },
  data() {
    return {
      store: usePostStore(),
    };
  },

  beforeRouteEnter(to, _from) {
    return (vm) => vm.store.loadPosts(to.query,to.params.tagId);
  },
  beforeRouteUpdate(to) {
    this.store.loadPosts(to.query,to.params.tagId);
  },
};
</script>

<template>
 <BaseLoader :error="store.error" :isLoading="store.isLoading" ></BaseLoader>
  <section v-if="store.posts">
    <Post v-for="post in store.posts" :key="post.id" :post="post" class="post"></Post>
  </section>
</template>
<style>
.post {
  &:not(:last-child) {
    margin-bottom: 2em;
    border-bottom: 1px solid darkslategray;
  }
}
</style>
