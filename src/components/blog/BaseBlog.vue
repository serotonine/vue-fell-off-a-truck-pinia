<script setup>
import { onMounted, ref, computed } from "vue";
import posts from "@/data/posts.json";
const props = defineProps({
  complete: { type: Boolean },
  post: { type: Object, default: null },
  postId: { type: Number, default: null },
});
const post = computed(() => {
  console.log(posts.find((post) => post.id === props?.postId));
  return props?.post
    ? props.post
    : posts.find((post) => post.id === props?.postId);
});
</script>
<template>
  <!-- Full -->
  <article v-if="complete" class="post_full">
    <header>
      <figure>
        <img :src="post.image" :alt="post.title" />
      </figure>
      <div class="post_tags">
        <button class="btn btn-tag" v-for="tag in post.tags" :key="tag">
          {{ tag }}
        </button>
      </div>
      <h3>{{ post.title }}</h3>
      <h4 v-if="complete">{{ post.subtitle }}</h4>
      <h5>
        Published by
        <a :href="post.author.avatar" target="_blank">{{ post.author.name }}</a>
        le {{ post.date }}
      </h5>
    </header>
    <div class="post_body">
      <p>{{ post.content }}</p>
    </div>
    <footer class="post_footer"></footer>
  </article>
  <!-- Teaser -->
  <article class="post_teaser" v-else>
    <header>
      <div class="post_tags flex">
        <button class="btn btn-tag" v-for="tag in post.tags" :key="tag">
          {{ tag }}
        </button>
      </div>
      <h3>{{ post.title }}</h3>
      <h4 v-if="complete">{{ post.subtitle }}</h4>
      <h5>
        Published by
        <a :href="post.author?.avatar" target="_blank">{{
          post.author?.name
        }}</a>
        le {{ post.date }}
      </h5>
    </header>
    <div class="post_body">
      <p>{{ post.excerpt }}</p>
    </div>
    <footer class="post_footer">
      <RouterLink
        :to="{ name: 'blog-detail-route', params: { postId: post.id } }"
        >Voir plus</RouterLink
      >
    </footer>
  </article>
</template>

<style scoped>
  .post_teaser {
    padding: 1rem 1.5rem;
    border: 1px solid lightgray;
    border-radius: 0.5rem;
  }
  .post_tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
