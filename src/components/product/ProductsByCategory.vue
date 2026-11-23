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
.label {
  display: inline-block;
  margin: 0;
}
select {
  appearance: none;
  min-width: 20ch;
  border-radius: 0;
  border-color: var(--color-base);
  padding: 0.5rem 0.75rem;
}

@supports (appearance: base-select) {
  select,
  ::picker(select) {
    appearance: base-select;
  }

  ::picker(select) {
    margin-top: 4px;
    padding: 0;
    border: 1px solid #d1d5db;
    border-radius: 0;
    background: #fff;
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
  }

  option {
    padding: 0.5rem 0.75rem;
    border-radius: 0;
    cursor: pointer;
  }

  option:hover,
  option:focus-visible {
    background: #eef2ff;
  }

  option:checked {
    background: #6366f1;
    color: #fff;
  }

  /* la coche native devant l'option choisie */
  option::checkmark {
    display: none;
  }

  /* la flèche native du select (remplace ta flèche SVG) */
  select::picker-icon {
    color: #6b7280;
    transition: rotate 0.2s;
  }

  select:open::picker-icon {
    rotate: 180deg;
  }
}
</style>
