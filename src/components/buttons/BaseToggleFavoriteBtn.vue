<script setup>
import { useFavoriteStore } from "@/stores/favorite.store";
import { Heart } from "@lucide/vue";
const favoriteStore = useFavoriteStore();
const { toggleFavorite, isFavorite } = favoriteStore;
const props = defineProps({
  product: { type: Object, required: true },
  size: { type: Number, default: 24 },
});

</script>
<template>
  <button class="btn-favorite" @click.prevent="toggleFavorite(product)">
    <Heart
      :size="size"
      :color="isFavorite(product) ? 'deeppink' : 'dimgray'"
      :fill="isFavorite(product) ? 'deeppink' : 'white'"
    ></Heart>
  </button>
</template>
