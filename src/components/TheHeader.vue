<script setup>
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth.store";
  import { useCartStore } from "@/stores/cart.store";
  import { useFavoriteStore } from "@/stores/favorite.store";
  import { ShoppingCart , Heart  } from "@lucide/vue";
  const auth = useAuthStore();
  const cart = useCartStore();
  const {favorites} = useFavoriteStore();
  const router = useRouter();
  const logout = ()=>{
    auth.logout();
    router.push({name:'products-route'});
  }
</script>

<template>
  <header class="header">
    <h1>Fell off a truck</h1>
    <menu aria-label="menu">
      <li>
        <router-link :to="{ name: 'products-route' }">Products</router-link>
      </li>
      <li class="link_cart">
        <div v-if="!!cart.nbProducts" class="link_cart_qty"><span>{{ cart.nbProducts }}</span></div>
        <router-link :to="{ name: 'cart-route' }" aria-label="Cart">
          <ShoppingCart aria-hidden="true"></ShoppingCart>
        </router-link>
      </li>
       <li v-if="!!favorites.size"  class="link_favorites">
        <router-link :to="{ name: 'favorites-route' }" aria-label="Favorites">
          <Heart aria-hidden="true"></Heart>
        </router-link>
      </li>
      <li><router-link :to="{ name: 'blog-route' }">Blog</router-link></li>
     <!--  Login-logout -->
        <li v-if="!auth.isAuthenticated">
        <router-link  :to="{ name: 'login-route' }">Login</router-link>
      </li>
      <li v-else><button class="btn btn-reset" @click="logout">Logout</button></li>
      <!-- <li> <router-link
        :to="{
          name: 'posts-route',
          query: { limit: 15, sortBy: 'views', order: 'desc' },
        }"
        >Posts</router-link
      ></li> -->
    </menu>
  </header>
</template>

<style scoped>
  .header {
    display: flex;
    align-items: baseline;
    margin-bottom: 2em;
    .router-link-active {
      font-weight: 600;
    }
  li {
    list-style-type: none;
   }
}
.link_cart{
  position:relative;
  .link_cart_qty{
    position:absolute;
    top:-1.5ch;
    right:-1.5ch;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: orange;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65em;
  }
}
</style>
