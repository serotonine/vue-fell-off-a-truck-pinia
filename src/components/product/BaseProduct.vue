<script setup>
import FavoriteBtn from "@/components/buttons/BaseToggleFavoriteBtn.vue";
import { euroFormat } from "@/stores/cart.store";
const props = defineProps({ product: { type: Object, required: true } });
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
        <favorite-btn :product="product" :size="20"></favorite-btn>
      </div>
    </div>
  </article>
</template>
