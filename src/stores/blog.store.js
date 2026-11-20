/*
 * ref => state,
 * computed => getters,
 * functions => actions.
 * Must return everything.
 */
// OPTIONS API //
import { defineStore } from "pinia";
import { POSTS_URL, BG_COLORS } from "@/config.js";

export const useBlogStore = defineStore("blog", {
  state: () => {
    const tagsColor = new Map(
      JSON.parse(localStorage.getItem("tagsColor") ?? "[]")
    );
    const used = new Set(tagsColor.values());
    return {
      error: null,
      isLoading: false,
      posts: null,
      tagsColor,
      bgColors: BG_COLORS.filter((c) => !used.has(c)),
    };
  },

  actions: {
    pickBgColor() {
      if (this.bgColors.length === 0) {
        this.bgColors = [...BG_COLORS];
      }
      const index = Math.floor(Math.random() * this.bgColors.length);
      return this.bgColors.splice(index, 1)[0];
    },

    setTagList(posts) {
      let added = false;
      posts.forEach((post) => {
        (post.tags ?? []).forEach((tag) => {
          if (!this.tagsColor.has(tag)) {
            this.tagsColor.set(tag, this.pickBgColor());
            added = true;
          }
        });
      });
      if (added) {
        localStorage.setItem("tagsColor", JSON.stringify([...this.tagsColor]));
      }
    },

    async loadPosts(query = null, tag = null) {
      this.error = null;
      this.isLoading = true;
      const params = query ? `?${new URLSearchParams(query)}` : "";
      const url = tag
        ? `${POSTS_URL}/tag/${encodeURIComponent(tag)}`
        : `${POSTS_URL}${params}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        this.posts = data.posts;
        this.setTagList(data.posts);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
