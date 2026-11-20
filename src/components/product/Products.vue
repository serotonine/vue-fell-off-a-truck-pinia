<script setup>
import Product from "./Product.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import ProductsByCategory from "@/components/product/ProductsByCategory.vue";
import { useProductStore } from "@/stores/product.store.js";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useProductStore();

const { isLoading, error, products } = storeToRefs(store);

onMounted(() => {
  if (products.value) {
    return;
  }
  store.loadProducts();
});
</script>

<template>
  <h2>Products</h2>
  <section class="wrapper_content">
    <div class="loader"><base-loader :error="error" :is-loading="isLoading" /></div>
    <ProductsByCategory v-if="products?.length"></ProductsByCategory>
    <transition name="product" appear>
      <section v-if="products?.length" class="products_grid">
        <Product
          v-for="product in products"
          :key="product.id"
          :product="product"
        ></Product>
      </section>
    </transition>
  </section>
</template>

<style scoped>

.product-enter-active,
.product-leave-active {
  transition: opacity 0.5s ease-out;
}

.product-enter-from,
.product-leave-to {
  opacity: 0;
  
}
@keyframes turn{
  0%{transform: rotate(0deg);}
  100%{transform: rotate(360deg);}
}
</style>
