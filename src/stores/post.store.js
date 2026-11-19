/*
 * ref => state,
 * computed => getters,
 * functions => actions.
 * Must return everything.
 */
// OPTIONS API //
import { defineStore } from "pinia";
import { POSTS_URL } from "@/config.js";

export const usePostStore = defineStore("post", {
  state: () => ({
    error: null,
    isLoading: false,
    posts: null,
  }),
  actions: {
    async loadPosts(query, tag=null) {
      this.error = null;
      this.isLoading = true;
      const params = new URLSearchParams(query);
      console.log(tag);
      const url = tag ? `${POSTS_URL}/tag/${tag}?${params}`: `${POSTS_URL}?${params}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        this.posts = data.posts;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
