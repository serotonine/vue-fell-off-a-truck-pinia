<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCartStore, euroFormat } from "@/stores/cart.store";
import { storeToRefs } from "pinia";
import BaseCartItem from "./BaseCartItem.vue";
const cart = useCartStore();
const router = useRouter();
const { total, nbProducts } = storeToRefs(useCartStore());
/* If cart is empty or become empty */
onMounted(() => {
  if (nbProducts.value === 0) {
    router.replace({ name: "products-route" });
  }
});
watch(nbProducts, (current)=>{
   if (current === 0) {
    router.replace({ name: "products-route" });
  }
});
</script>

<template>
  <div class="container">
    <h2>My Card</h2>
    <ul class="reset">
      <base-cart-item
        v-for="product in cart.products"
        :key="product.id"
        :product="product"
      ></base-cart-item>
    </ul>
    <div class="cart_total">
      <h3>Total</h3>
      <h3>{{ euroFormat.format(total) }}</h3>
    </div>
  </div>
</template>
<style>
.cart_total {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
}
</style>
