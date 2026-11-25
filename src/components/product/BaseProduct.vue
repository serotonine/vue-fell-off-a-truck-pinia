<script setup>
import { useFavoriteStore } from "@/stores/favorite.store";
import { Heart } from "@lucide/vue";
import { euroFormat } from "@/stores/cart.store";
const props = defineProps({ product: { type: Object, required: true } });
const favoriteStore = useFavoriteStore();
const {toggleFavorite, isFavorite} = favoriteStore;
</script>

<template>
  <article class="product">
    <figure class="product_thumb">
      <img :src="product.thumbnail" :alt="product.title" />
    </figure>
    <div class="product_desc">
      <router-link
        :to="{ name: 'product-detail', params: { productId: product.id } }"
      >
        <h5 class="product_name">{{ product.title }}</h5></router-link
      >
      <div class="product_price flex">
        <p>{{ euroFormat.format(product.price) }}</p>
        <button class="btn-favorite" @click.prevent="toggleFavorite(product)">
          <Heart :size="20" :color="isFavorite(product) ? 'deeppink': 'dimgray'" :fill="isFavorite(product) ? 'deeppink': 'white'"></Heart>
        </button>
      </div>
    </div>
  </article>
</template>
