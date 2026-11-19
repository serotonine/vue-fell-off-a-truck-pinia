<script setup>
import { onMounted } from "vue";
import { useCartStore, euroFormat } from "@/stores/cart.store";
const cart = useCartStore();
const props = defineProps({
  product: { type: Object, required: true },
});
/* onMounted(() => console.log(props.product));
 */</script>

<template>
  <li class="product_item">
    <div class="flex">
      <figure class="product_thumb">
        <img :src="product.thumbnail" :alt="product.title" />
      </figure>
      <div class="product_desc">
        <h4>{{ product.title }}</h4>
        <h5>
          <i>{{ product.brand }}</i>
        </h5>

        <div class="product_qty">
          <button class="btn btn-cta" @click="cart.addProduct(product)">
            +
          </button>
          <span>{{ product.qty }}</span>
          <button class="btn btn-cta" @click="cart.removeProduct(product.id)">
            -
          </button>
        </div>
      </div>
    </div>
    <div>
      <h3>{{ euroFormat.format(product.subtotal) }}</h3>
    </div>
  </li>
</template>

<style scoped>
.product_item {
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  padding: 0.5em 1em;
  &:nth-child(n+1){
    margin-top: 1em;;
  }
  .product_thumb {
    background-color: aliceblue;
    margin: 0;
    width: 150px;
  }
  .product_desc {
    padding-left: 1em;
    h4 {
      font-weight: 300;
      margin-top: 0;
      margin-bottom: 0.5em;
    }
    h5 {
       margin-top: 0;
      margin-bottom: 2em;

    }
  }
  .product_qty {
    margin: auto;
    button {
      aspect-ratio: 1/1;
      min-width: 4ch;
    }
    span {
      padding: 0 0.5em;
    }
  }
}
</style>
