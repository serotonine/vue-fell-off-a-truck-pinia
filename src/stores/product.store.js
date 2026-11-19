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
      console.log(categories.value);
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
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${PRODUCTS_URL}/${productId}`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      /* console.log("data", data); */
      product.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };
  return { error, isLoading, product, loadProductDetail };
});
