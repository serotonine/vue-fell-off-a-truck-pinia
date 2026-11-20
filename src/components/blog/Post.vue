<script setup>
const props = defineProps({ post: { type: Object, required: true } });
</script>
<template>
  <article>
    <header>
      <div class="posts_tags">

       <!--  <router-link
          v-for="tag in post.tags"
          :key="`${post.id}_${tag}`"
          :to="{
            name: 'posts-tag-route',
            params:{tagId:tag},
            query: { limit: 15, sortBy: 'views', order: 'desc' },
          }"
          class="btn btn-tag"
          >{{ tag }}</router-link
        > -->
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
.posts_tags {
  display: flex;
  gap: 0.25em;
  margin-bottom: 1em;
}
footer {
  margin-bottom: 1em;
}
</style>
