<script setup>
import { onMounted } from "vue";
import { euroFormat } from "@/stores/cart.store";
import { useFavoriteStore } from "@/stores/favorite.store";
import { useCartStore } from "@/stores/cart.store";
import { X, ShoppingCart, ShoppingCartPlus } from "@lucide/vue";
const {removeFavorite} = useFavoriteStore();
// Cart.
const cartStore =  useCartStore();
const {addProduct, isInCart} = cartStore;

const props = defineProps({
  favorite: { type: Object, required: true },
});
/* onMounted(()=> console.log(isInCart));
 */</script>

<template>
  <li class="product_item">
    <div class="flex">
      <router-link
        :to="{ name: 'product-detail', params: { productId: favorite.id } }"
      >
        <figure class="product_thumb">
          <img :src="favorite.thumbnail" :alt="favorite.title" />
        </figure>
      </router-link>
      <div class="product_content">
        <div class="product_desc">
          <router-link
            :to="{ name: 'product-detail', params: { productId: favorite.id } }"
          >
            <h4>{{ favorite.title }}</h4>
          </router-link>
          <h3>{{ euroFormat.format(favorite.price) }}</h3>
        </div>
        <div class="favorite_cta">
          <button
          @click="addProduct(favorite)"
            class="btn_favorite_cta add-to-cart"
            title="Add to cart"
            aria-label="Add product to cart"
          >
            <ShoppingCartPlus v-if="isInCart(favorite)" color="dimgray"></ShoppingCartPlus>
            <ShoppingCart v-else color="dimgray"></ShoppingCart>
          </button>
          <button
          @click="removeFavorite(favorite)"
            class="btn_favorite_cta"
            title="Remove from favorites"
            aria-label="Remove product from favorites"
          >
            <X></X>
          </button>
        </div>
      </div>
    </div>
  </li>
</template>
<style scoped>
.product_item {
  list-style-type: none;
  margin: 0;
  border: 1px solid lightgray;
  padding: 0.5em;
  &:nth-child(n + 1) {
    margin-top: 1em;
  }
  .product_thumb {
    background-color: aliceblue;
    margin: 0;
    width: 100px;
    img{transition: transform 0.15s ease-out;}
    &:hover{
      img{ transform: scale(1.25);}
    }
  }
  .product_content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .product_desc {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-left: 0.5em;
    h4 {
      font-weight: 300;
      margin-top: 0;
      margin-bottom: 0.5em;
    }
  }
  .favorite_cta {
    display: flex;
    justify-content: flex-end;
  }
  .btn_favorite_cta {
    cursor: pointer;
    border:none;
    padding:0.5em;
    align-items: center;
    font-size: 0.65em;
    border-radius: 50%;
    aspect-ratio: 1/1;
    transform:scale(0.8);
    &.add-to-cart{
      background-color: orange;
    }
  }
}
</style>
