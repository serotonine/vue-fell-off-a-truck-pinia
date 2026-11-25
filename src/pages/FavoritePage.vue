<script setup>
import BaseFavorite from "@/components/product/BaseFavorite.vue";
import { useFavoriteStore } from "@/stores/favorite.store";
import { storeToRefs } from "pinia";
import { onMounted, watch} from "vue";
import { useRouter } from "vue-router";
const favoritesStore = useFavoriteStore();
const {favorites} = storeToRefs(favoritesStore);
const router = useRouter();
/* If favorites is empty or become empty */
onMounted(() => {
  if (!favorites.value.size) {
    router.replace({ name: "products-route" });
  }
});
/* 
  * favorites is a Map (an object), Vue doesn't detect internal changes (add/remove entries) without { deep: true }.
**/
watch(favorites, (current)=>{
   if (!current.size) {
    router.replace({ name: "products-route" });
  }
}, {deep: true});
</script>
<template>
  <h2>My Favorite products</h2>
  <p v-if="favorites.size === 0">No favorites yet.</p>
  <ul v-else class="reset">
    <BaseFavorite
      v-for="favorite in favorites.values()"
      :key="favorite.id"
      :favorite="favorite"
    ></BaseFavorite>
  </ul>
</template>
