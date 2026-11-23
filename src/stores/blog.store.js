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
      JSON.parse(sessionStorage.getItem("tagsColor") ?? "[]"),
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
    // Pick & remove randomly a Hex color from BG_COLORS array.
    pickBgColor() {
      if (this.bgColors.length === 0) {
        this.bgColors = [...BG_COLORS];
      }
      const index = Math.floor(Math.random() * this.bgColors.length);
      return this.bgColors.splice(index, 1)[0];
    },
    /* POST TAGS */
    // Set a hex color for each tag and set tagsColor state.
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
        sessionStorage.setItem(
          "tagsColor",
          JSON.stringify([...this.tagsColor]),
        );
      }
    },
    /* POSTS */
    // Retrieve backend alike posts.
    getSessionPosts() {
      return JSON.parse(sessionStorage.getItem("blogPosts"));
    },

    // Function called on component to retrieve the posts.
    async getPosts(query = null, tag = null) {
      if (!this.getSessionPosts()) {
        await this.loadPosts();
      }
      let posts = this.getSessionPosts();
      if (!posts) {
        return;
      }
      this.posts = tag ? this.getPostsByTag(tag) : posts;
    },
    // Fetch the posts from dummyjson.com.
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
        sessionStorage.setItem("blogPosts", JSON.stringify(data.posts));
        this.posts = data.posts;
        this.setTagList(data.posts);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
    getPostsByTag(tag) {
      const posts = this.getSessionPosts();
      return posts.filter((post) => post.tags.some((item) => item === tag));
    },
    getPostById(postId) {
      return this.getSessionPosts().find((post) => post.id == postId);
    },
    // CRUD => Remove post.
    removePost(postId) {
      // Remove in storage.
      const posts = this.getSessionPosts().filter((post) => post.id !== postId);
      sessionStorage.setItem("blogPosts", JSON.stringify(posts));
      // Remove in state (skip the tagParam issue).
      this.posts = this.posts.filter((post) => post.id !== postId);
    },
    // CRUD => Patch post.
    updatePost(postId, updatedPost) {
      // Update in storage.
      const posts = this.getSessionPosts().map((post) =>
        post.id == postId ? updatedPost : post,
      );

      sessionStorage.setItem("blogPosts", JSON.stringify(posts));
      // Update in state (skip the tagParam issue).
      this.posts = this.posts.map((post) =>
        post.id == postId ? updatedPost : post,
      );
    },
  },
});
