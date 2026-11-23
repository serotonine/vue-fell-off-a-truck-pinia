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
  computed: {
    tagParam() {
      return this.$route.params?.tag ?? null;
    },
  },
  /*
   * to CRUD we need to store the posts
   * see https://www.udemy.com/course/maitrisez-vue-router-et-pinia/learn/lecture/47586881#overview
   **/
  beforeRouteEnter(to, _from) {
    return (vm) => vm.store.getPosts(null, to.params.tag);
  },
  beforeRouteUpdate(to) {
    this.store.getPosts(null, to.params.tag);
  },
};
</script>

<template>
  <h2 v-if="tagParam">Tag: {{ tagParam }}</h2>
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
  <router-view></router-view>
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
