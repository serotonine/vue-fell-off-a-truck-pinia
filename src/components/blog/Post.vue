<script setup>
import { useAuthStore } from '@/stores/auth.store.js';
import { useBlogStore } from '@/stores/blog.store.js';
import CloseBtn from '@/components/buttons/BaseCloseBtn.vue';
import EditBtn from '@/components/buttons/BaseEditBtn.vue';
import Tag from '@/components/blog/BasePostTag.vue';
const props = defineProps({ 
  post: { type: Object, required: true }});
const { user } = useAuthStore();
const { removePost } = useBlogStore();
</script>
<template>
  <article>
    <header>
      <div class="post_tags">

<Tag v-for="tag in post.tags.sort()" :key="`${post.id}_${tag}`" :tag="tag" bgColor="orange"></tag>
      </div>
      <h3>{{ post.title }}</h3>
    </header>
      <p>{{ post.body }}</p>
      <p><small>{{ post.views }} views</small></p>
    <footer v-if="user && user.role ==='editor'" class="flex">
     <close-btn @click="removePost(post.id)" :trash="true"></close-btn>    
     <router-link :to="{name:'blog-edit-post', params:{postId: post.id}} "><edit-btn></edit-btn></router-link>    
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
