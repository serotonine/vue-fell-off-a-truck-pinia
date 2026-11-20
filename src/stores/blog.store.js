/*
 * ref => state,
 * computed => getters,
 * functions => actions.
 * Must return everything.
 */
// OPTIONS API //
import { defineStore } from "pinia";
import { POSTS_URL } from "@/config.js";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    error: null,
    isLoading: false,
    posts: null,
    tags :new Set(),
  }),
  actions: {
    setTagList(data){
      data.forEach((post) => { 
        post.tags.foreach((tag) => this.tags.add(tag))});
    },
    async loadPosts(query, tag=null) {
      this.error = null;
      this.isLoading = true;
      const params = new URLSearchParams(query);
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
