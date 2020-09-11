<template>
  <nav>
    <v-toolbar style="background-color: rgba(14, 14, 14, 0.99); color: #e3dfcf;">
      <v-toolbar-title>
        <v-btn
          text
          style="color: #e3dfcf;"
          to="/"
        >
          <v-icon class="mr-2">
            movie
          </v-icon> V-MARKET
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-menu
        offset-y
        :close-on-content-click="isCloseOnClickContent"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-4"
            text
            style="color: #e3dfcf;"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mr-1">
              shopping_cart
            </v-icon>
            Cart
            <v-badge
              v-if="cartsLength !== 0"
              :content="cartsLength"
              color="red lighten-1"
            />
          </v-btn>
        </template>
        <Cart />
      </v-menu>
      <v-btn
        text
        style="color: #e3dfcf;"
        to="/admin/products"
      >
        <v-icon class="mr-1">
          account_box
        </v-icon>
        Admin
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import Cart from '@/components/CartTable';

export default {
  name: 'TheNavbar',
  components: {
    Cart,
  },
  data() {
    return {
      isCloseOnClickContent: false,
    };
  },
  computed: {
    cartsLength() {
      const { length } = this.$store.state.cart.carts;
      return length;
    },
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.$store.dispatch('cart/getCarts');
    },
  },
};
</script>
