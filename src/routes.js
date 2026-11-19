// Stores.
import { useAuthStore } from "./stores/auth.store";
// Components.
import ProductDetail from "@/components/product/ProductDetail.vue";
import Products from "@/components/product/Products.vue";
import Posts from "@/components/Posts.vue";
import TheBlog from "@/components/blog/TheBlog.vue";
import BaseBlog from "@/components/blog/BaseBlog.vue";
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
  {
    path: "/cart",
    component: TheCart,
    name: "cart-route",
    /*  beforeEnter: [redirectAuth], */
    /*  beforeEnter:(to,from)=> {
      const authStore = useAuthStore();
      if(!authStore.isAuthenticated){
        return {name:'login-route'}
      }

    } */
    /*
     * Other Guard way.
     */
    meta: { requireAuth: true },
  },
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
    path: "/posts",
    component: Posts,
    name: "posts-route",
  },
  {
    path: "/posts/:tagId",
    component: Posts,
    name: "posts-tag-route",
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
    component: TheBlog,
    name: "blog-route",
  },
  {
    path: "/blog/:postId(\\d+)",
    component: BaseBlog,
    name: "blog-detail-route",
    props: (route) => ({
      postId: Number(route.params.postId),
      complete: true,
    }),
  },
];
