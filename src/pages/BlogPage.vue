<script>
import { mapStores } from "pinia";
import { useBlogStore } from "@/stores/blog.store.js";
import { useAuthStore } from "@/stores/auth.store.js";
import BasePost from "@/components/blog/BasePost.vue";
import BaseLoader from "@/components/BaseLoader.vue";

export default {
  components: { BasePost, BaseLoader },
  data() {
    return {
      /*  store: useBlogStore(), */
      user: useAuthStore().user,
    };
  },
  computed: {
    tagParam() {
      return this.$route.params?.tag ?? null;
    },
    //  Return a computed with name store's id (defineStore("blog", …))  +  'Store', =>  blogStore.
    ...mapStores(useBlogStore, useAuthStore),
  },
  /*
   * to CRUD we need to store the posts
   * see https://www.udemy.com/course/maitrisez-vue-router-et-pinia/learn/lecture/47586881#overview
   **/
  watch: {
    tagParam: {
      handler() {
        this.blogStore.getPosts({ sortBy: "id", order: "desc" }, this.tagParam);
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <header class="blog_header">

    <h2>
      <router-link :to="{name: 'blog-route', params:null}">Blog</router-link>
      <span v-if="tagParam"> / {{ tagParam }}</span>
    </h2>
    <router-link
      v-if="authStore.user"
      :to="{ name: 'blog-add-post' }"
      class="btn btn-cta"
      >Create post</router-link
    >
  </header>
  <div class="wrapper_content">
    <div class="loader">
      <BaseLoader
        :error="blogStore.error"
        :isLoading="blogStore.isLoading"
      ></BaseLoader>
    </div>
    <section class="wrapper" v-if="blogStore.posts">
      <BasePost
        v-for="post in blogStore.posts"
        :key="post.id"
        :post="post"
        class="post"
      ></BasePost>
    </section>
  </div>
  <router-view></router-view>
</template>
<style scoped>
.blog_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  h2 {
    margin-bottom: 0;
  }
}
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
