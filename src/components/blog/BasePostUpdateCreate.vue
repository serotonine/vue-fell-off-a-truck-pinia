<script setup>
import { ref, useTemplateRef, computed } from "vue";
import { useBlogStore } from "@/stores/blog.store";
import { useRoute } from "vue-router";
import BaseDialog from "../BaseDialog.vue";
import { ThumbsUp, ThumbsDown } from "@lucide/vue";

/*
 * This dialog open on a Click Edit : it changes the route.
 * * E.g. ../blog/edit/3
 * See <router-link> in Post.vue
 **/

const props = defineProps({
  postId: { type: String, required: false },
});
/*
 * Very practical !
 * avoid error undeclared params
 * when route.props === true
 * E.g. ../blog/[tag]/edit/3
 **/
defineOptions({ inheritAttrs: false });

const blogStore = useBlogStore();
const baseDialog = useTemplateRef("baseDialog");
const route = useRoute();
const post = ref(props.postId ? blogStore.getPostById(props.postId) : null);
const error = ref(null);
const blogTags = computed(() => [...blogStore.tagsColor.keys()].sort());

// Submit.
function onSubmit(evt) {
  const form = new FormData(evt.target);
  // TODO check input values.
  const data = {
    title: form.get("title"),
    body: form.get("body"),
    tags: form.getAll("tags"),
    reactions: {
      likes: Number(form.get("likes")),
      dislikes: Number(form.get("dislikes")),
    },
  };
  let newPost;
  if (post.value?.id) {
    newPost = {
      ...post.value,
      ...data,
    };
  } else {
    newPost = {
      id: blogStore.getNewPostId(),
      views: 0,
      ...data,
    };
  }
  blogStore.updateCreatePost(newPost.id, newPost, route.params.tag);
  baseDialog.value.closeDialog();
}
</script>
<template>
  <base-dialog ref="baseDialog">
    <form @submit.prevent="onSubmit">
      <p class="error">{{ error }}</p>
      <fieldset>
        <legend><small>Tags</small></legend>
        <label v-for="tag in blogTags" :key="tag" class="tag">
          <input
            type="checkbox"
            name="tags"
            :value="tag"
            :checked="post?.tags.includes(tag)"
          />
          <small>{{ tag }}</small>
        </label>
      </fieldset>
      <label class="blog-edit-form_el"
        ><small>Title</small
        ><input type="text" name="title" :value="post?.title" required
      /></label>
      <label class="blog-edit-form_el">
        <small>Body</small>
        <textarea
          name="body"
          :value="post?.body"
          autocorrect="on"
          rows="10"
          required
        ></textarea>
      </label>
      <fieldset class="reactions_wrapper">
        <legend><small>Reactions</small></legend>
        <label
          v-for="[key, value] in Object.entries(
            post?.reactions ?? { likes: 0, dislikes: 0 },
          )"
          :key="key"
          class="reactions"
        >
          <ThumbsUp v-if="key === 'likes'" :size="18"></ThumbsUp>
          <ThumbsDown v-else :size="18"></ThumbsDown>
          <input
            type="number"
            :name="key"
            :value="value"
            min="0"
            max="10000"
            required
          />
        </label>
      </fieldset>
      <button type="submit" class="btn btn-cta">Save</button>
    </form>
  </base-dialog>
</template>

<style scoped>
.blog-edit-form_header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.75rem;
}
.btn-close {
  margin-left: auto;
}
fieldset {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  gap: 0.25rem;
  &.reactions_wrapper {
    gap: 1rem;
  }
  label {
    display: flex;
    align-content: center;
    &:has(input:checked) {
      font-weight: 600;
    }
    &.tag {
      gap: 0;
    }
    &.reactions {
      gap: 0.25rem;
    }
  }
}
.blog-edit-form_el {
  display: block;
  margin-top: 0.75rem;
  input[type="text"],
  textarea {
    width: 100%;
  }
}
.btn-cta {
  padding: 0.5rem;
  margin-top: 0.75rem;
}
</style>
