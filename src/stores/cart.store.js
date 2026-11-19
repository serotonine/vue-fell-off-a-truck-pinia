import { defineStore } from "pinia";

export const euroFormat = new Intl.NumberFormat("fr-BE", {
  style: "currency",
  currency: "EUR",
});

/*
 * ref => state,
 * computed => getters,
 * functions => actions.
 * Must return everything.
 */
// COMPOSITION API //
export const useCartStore = defineStore("cart", {
  state: () => ({
    products: [],
  }),
  getters: {
    total: (state) => {
      return state.products.reduce((acc, product) => acc + product.subtotal, 0);
    },
    nbProducts: (state) => {
      return state.products.reduce((acc, product) => acc + product.qty, 0);
    },
  },
  actions: {
    isInCart(product) {
      return this.products.some((item) => item.id === product.id);
    },
    addProduct(product) {
      const existing = this.products.findIndex(
        (item) => item.id === product.id,
      );
      if (existing >= 0) {
        const current = this.products[existing];
        current.qty++;
        current.subtotal = current.price * current.qty;
      } else {
        this.products.push({
          ...product,
          qty: 1,
          subtotal: product.price,
        });
      }
    },
    removeProduct(productId) {
      const id = this.products.findIndex((item) => item.id === productId);
      if (id >= 0) {
        const current = this.products[id];
        current.qty--;
        current.subtotal = current.qty * current.price;
        if (this.products[id].qty === 0) {
          this.products.splice(id, 1);
        }
      }
    },
  },
});
