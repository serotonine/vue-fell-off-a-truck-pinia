import { defineStore } from "pinia";
import { ref } from "vue";

// COMPOSITION API //
export const useFavoriteStore = defineStore("favorite", () => {
  // State.
  /** @type {Ref<Map<number, Product>>} */
  const favorites = ref(new Map());
  // Getters.
  const isFavorite = (product) => favorites.value.has(product.id);
  // Actions.
  const toggleFavorite = (product) => {
    isFavorite(product) ? removeFavorite(product) : addFavorite(product);
  }
  const addFavorite = (product) => favorites.value.set(product.id, product);
  const removeFavorite = (product) => {
    favorites.value.delete(product.id);
  };
  return {
    favorites,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
});
