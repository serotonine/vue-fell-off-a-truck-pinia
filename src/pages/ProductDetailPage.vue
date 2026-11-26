<script setup>
import { watch, ref, Transition } from "vue";
import { storeToRefs } from "pinia";
import { useProductDetailStore } from "@/stores/product.store";
import { useCartStore, euroFormat } from "@/stores/cart.store";
import BaseLoader from "@/components/BaseLoader.vue";

const props = defineProps({ productId: String });
const store = useProductDetailStore();
const { error, isLoading, product } = storeToRefs(store);
const cart = useCartStore();

watch(
  () => props.productId,
  (newId) => store.loadProductDetail(newId),
  { immediate: true },
);
const productAdded = ref(false);
function addProduct(e) {
  cart.addProduct(product.value);
  e.currentTarget.blur();
  productAdded.value = true;
  setTimeout(() => (productAdded.value = false), 1000);
}
/* onMounted(() => console.log("Product", product.value.thumbnail));
 */
</script>

<template>
  <div class="product-detail-page">
    <div class="loader">
      <base-loader :error="error" :is-loading="isLoading" />
    </div>
    <h2 class="product-detail-page_title">Product / {{ product?.category }}</h2>
    <transition name="productmounted" appear>
      <section v-if="product" class="product-detail" :key="product.id">
        <article class="product-detail_thumbnail">
          <figure class="product_thumb">
            <img :src="product.images[0]" :alt="product.title" />
          </figure>
        </article>
        <aside class="product-detail_infos">
          <header>
            <h2 class="product-detail_name">{{ product.title }}</h2>
            <h3 class="product-detail_brand">
              <i>{{ product.brand }}</i>
            </h3>
          </header>
          <section>
            <p>{{ product.description }}</p>
            <h3>{{ euroFormat.format(product.price) }}</h3>
          </section>
          <footer>
            <button class="btn btn-cta" @click="addProduct($event)">
              Add to cart
            </button>
            <output>
              <transition name="productadded">
                <small v-if="productAdded"
                  >{{ product.title }} added in basket</small
                >
              </transition>
            </output>
          </footer>
        </aside>
      </section>
    </transition>
  </div>
</template>

<style scoped>
.product-detail {
  flex: 1;
  min-height: 0;

  @media (min-width: 640px) {
    display: flex;
    justify-content: center;
    gap: 2em;
  }
  .product-detail_thumbnail {
    flex: 1;
    /* default: auto */
    min-height: 0;
    max-width: 100vw;
    @media (min-width: 480px) {
      max-width: 70vw;
    }

    @media (min-width: 640px) {
      min-width: 50%;
    }
    @media (min-width: 992px) {
      max-width: 60%;
    }
    @media (min-width: 1024px) {
      max-width: 60%;
    }
  }
  figure.product_thumb {
    margin-inline: 0;
    height: 100%;
    overflow: hidden;
    img {
      object-fit: contain;
    }
  }
  .product-detail_infos {
    border-left: 1px solid darkslategray;
    padding: 2em 0 2em 2em;
    background-color: white;
    align-self: center;
  }
  .product-detail_name {
    margin-top: 0;
    margin-bottom: 0.25em;
  }
  .product-detail_brand {
    margin-top: 0;
    font-weight: 500;
  }
  output {
    padding-left: 0.25em;
    font-size: small;
  }
  .productadded-enter-active,
  .productadded-leave-active {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .productadded-enter-from,
  .productadded-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }
 
}
 .productmounted-enter-active,
  .productmounted-leave-active {
    transition: opacity 0.3s ease-out 0.3s;
  }

  .productmounted-enter-from,
  .productmounted-leave-to {
    opacity: 0;
  }
</style>

/* availabilityStatus : "In Stock" category : "groceries" description : "Creamy
and delicious ice cream, available in various flavors for a delightful treat."
dimensions : {width: 14.83, height: 15.07, depth: 24.2} discountPercentage :
8.69 id : 28 images : (4)
['https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp',
'https://cdn.dummyjson.com/product-images/groceries/ice-cream/2.webp',
'https://cdn.dummyjson.com/product-images/groceries/ice-cream/3.webp',
'https://cdn.dummyjson.com/product-images/groceries/ice-cream/4.webp'] meta :
{createdAt: '2025-10-23T18:27:08.836Z', updatedAt: '2025-11-04T01:48:01.853Z',
barcode: '0788954559076', qrCode:
'https://cdn.dummyjson.com/public/qr-code.png'} minimumOrderQuantity : 42 price
: 5.49 rating : 3.39 returnPolicy : "No return policy" reviews : (3) [{…}, {…},
{…}] shippingInformation : "Ships in 2 weeks" sku : "GRO-BRD-CRE-028" stock : 27
tags : ['desserts'] thumbnail :
"https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp"
title : "Ice Cream" warrantyInformation : "1 month warranty" weight : 1 */
