<script>
import { useBlogStore } from "@/stores/blog.store.js";
import Post from "@/components/blog/Post.vue";
import BaseLoader from "@/components/BaseLoader.vue";

export default {
  components: { Post, BaseLoader },
  data() {
    return {
      store: useBlogStore(),
    };
  },

  beforeRouteEnter(to, _from) {
    return (vm) => vm.store.loadPosts(to.query, to.params.tagId);
  },
  beforeRouteUpdate(to) {
    this.store.loadPosts(to.query, to.params.tagId);
  },
};
</script>

<template>
  <div class="wrapper_content">
    <div class="loader">
      <BaseLoader
        :error="store.error"
        :isLoading="store.isLoading"
      ></BaseLoader>
    </div>
    <section class="wrapper" v-if="store.posts">
      <Post
        v-for="post in store.posts"
        :key="post.id"
        :post="post"
        class="post"
      ></Post>
    </section>
  </div>
</template>
<style scoped>
@media screen and (min-width: 645px) {
  .wrapper {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
}

.post {
 padding: 0 1em;
    border: 1px solid lightgray;
    border-radius: 0.5rem;
}
</style>
