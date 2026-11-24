// Stores.
import { useAuthStore } from "./stores/auth.store";
// Components.
import ProductDetail from "@/components/product/ProductDetail.vue";
import Products from "@/components/product/Products.vue";
import Blog from "@/components/blog/TheBlog.vue";
import TheBlogEdit from "@/components/blog/TheBlogEdit.vue";
import TheCart from "@/components/cart/TheCart.vue";
import BaseLogin from "@/components/auth/BaseLogin.vue";
import Favorites from "@/components/product/Favorites.vue";

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
    redirect: { name: "basket" },
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
  // A good way to set the "/products" class "router-link-active"
  {
    path: "/products",
    alias: "/",
    children: [
      { path: "", component: Products, name: "products-route" },
      {
        path: "product/:productId(\\d+)",
        component: ProductDetail,
        name: "product-detail",
        props: true,
      },
    ],
  },

  {
    path: "/favorites",
    component: Favorites,
    name: "favorites-route",
    meta: { requireAuth: true },
  },
  {
    path: "/blog/:tag?",
    component: Blog,
    name: "blog-route",
    children: [
      {
        path: "edit/:postId",
        name: "blog-edit-post",
        props: true,
        component: TheBlogEdit,
        meta: { requireAuth: true, roles: ["editor"] },
      },
      {
        path: "add",
        name: "blog-add-post",
        component: TheBlogEdit,
        meta: { requireAuth: true, roles: ["editor"] },
      },
    ],
  },
];
