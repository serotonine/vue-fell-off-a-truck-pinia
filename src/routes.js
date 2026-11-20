// Stores.
import { useAuthStore } from "./stores/auth.store";
// Components.
import ProductDetail from "@/components/product/ProductDetail.vue";
import Products from "@/components/product/Products.vue";
import Blog from "@/components/blog/TheBlog.vue";
import TheCart from "@/components/cart/TheCart.vue";
import BaseLogin from "@/components/auth/BaseLogin.vue";
import Favorites from "./components/product/Favorites.vue";

// External function to redirect to login if not authentificated.
function redirectAuth() {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return { name: "login-route" };
  }
}

export const routes = [
  // Redirect example.
  /* 
   * With 'redirect' the url change
   * that is the case with 'alias'
  **/
  {
    path: "/basket",
    component: TheCart,
    name: "cart-route",
    meta: { requireAuth: true },
  },

  {
    path: "/cart",
    /* redirect: (to) => "/basket" */
    redirect: {name:'basket'}
  },
  // End redirect.
  {
    path: "/login",
    component: BaseLogin,
    name: "login-route",
    beforeEnter: (to, from) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        return { name: "products-route" };
      }
    },
  },
  
  {
    path: "/products",
    alias: "/",
    component: Products,
    name: "products-route",
  },
  {
    path: "/product/:productId(\\d+)",
    component: ProductDetail,
    name: "product-detail",
    props: true,
  },
   {
    path: "/favorites",
    component: Favorites,
    name: "favorites-route",
    meta: { requireAuth: true },
  },
 {
    path: "/blog",
    component: Blog,
    name: "blog-route",
  },

];
