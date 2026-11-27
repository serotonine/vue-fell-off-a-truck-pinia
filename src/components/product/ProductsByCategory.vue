<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/product.store";
import { storeToRefs } from "pinia";
import { capitalize } from "@/utils/utils";
const productStore = useProductStore();
const { categories } = storeToRefs(productStore);
const categoriesSelect = ref(null);

// Event.
const sortProducts = () => productStore.loadProducts(categoriesSelect.value);
</script>
<template>
  <fieldset>
    <select name="categories" v-model="categoriesSelect" @change="sortProducts">
      <option :value="null" selected>All categories</option>
      <option v-for="category in categories" key="category" :value="category">
        {{ capitalize(category) }}
      </option>
    </select>
  </fieldset>
</template>
<style scoped>
fieldset {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5em;
  border: none;
  padding: 0 0 1.2em 0;
}
</style>
