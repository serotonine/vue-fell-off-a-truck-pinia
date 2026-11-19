<script setup>
import Favorite from "@/components/product/Favorite.vue";
import { useFavoriteStore } from "@/stores/favorite.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const favoritesStore = useFavoriteStore();
const {favorites} = storeToRefs(favoritesStore);
</script>
<template>
  <h2>My Favorite products</h2>
  <p v-if="favorites.size === 0">No favorites yet.</p>
  <ul v-else class="reset">
    <Favorite
      v-for="favorite in favorites.values()"
      :key="favorite.id"
      :favorite="favorite"
    ></Favorite>
  </ul>
</template>
