/*
 * ref => state,
 * computed => getters,
 * functions => actions.
 * Must return everything.
 */
// COMPOSITION API //
import { defineStore } from "pinia";
import { ref } from "vue";
import { PRODUCTS_URL } from "@/config.js";

export const useProductStore = defineStore("product", () => {
  // States.
  const error = ref(null);
  const isLoading = ref(false);
  const products = ref(null);
  const categories = ref(new Set());
  // Actions.
  const getProducts = (data) => {
    return data.map((product) => {
      const { id, title, price, thumbnail, tags } = product;
      return { id, title, price, thumbnail, tags };
    });
  };
  const setCategories = (data) => data.forEach((product) => categories.value.add(product.category));

  const loadProducts = async (category = null) => {
    isLoading.value = true;
   const url = typeof category === 'string' ? `${PRODUCTS_URL}/category/${category}`: PRODUCTS_URL
    try {
      /* ?sortBy=tags&order=asc */
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      products.value = getProducts(data?.products);
      setCategories(data?.products);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };
  return { error, isLoading, products, categories, loadProducts };
});

export const useProductDetailStore = defineStore("productDetail", () => {
  const error = ref(null);
  const isLoading = ref(false);
  const product = ref(null);

  const loadProductDetail = async (productId) => {
    // Reset product to avoid space sync whith the product image.
    product.value = null;
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${PRODUCTS_URL}/${productId}`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      product.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };
  return { error, isLoading, product, loadProductDetail };
});
