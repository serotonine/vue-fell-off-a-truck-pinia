<script setup>
import Tag from './BasePostTag.vue';
const props = defineProps({ post: { type: Object, required: true } });
</script>
<template>
  <article>
    <header>
      <div class="post_tags">

<Tag v-for="tag in post.tags" :key="`${post.id}_${tag}`" :tag="tag" bgColor="orange"></tag>
      </div>
      <h3>{{ post.title }}</h3>
    </header>
    <main>
      <p>{{ post.body }}</p>
    </main>
    <footer>
      <span>Views : {{ post.views }}</span>
      <span> </span>
    </footer>
  </article>
</template>
<style scoped>
.post_tags {
  display: flex;
  gap: 0.5em;
  margin: 1em 0;
}
footer {
  margin-bottom: 1em;
}
</style>
