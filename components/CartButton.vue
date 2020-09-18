<template>
  <v-fab-transition>
    <v-btn
      fab
      large
      dark
      class="ps-absolute"
      to="/cart"
    >
      <v-icon style="color: #e3dfcf;">
        shopping_cart
      </v-icon>
      <v-badge
        v-if="cartsLength !== 0"
        :content="cartsLength"
        color="red lighten-1"
        offset-x="2"
        offset-y="-6"
      />
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  computed: {
    cartsLength() {
      const { length } = this.$store.state.cart.carts;
      return length;
    },
  },
};
</script>

<style lang="scss" scoped>
  .ps-absolute {
    position: fixed;
    right: 8px;
    bottom: 8px;
  }
</style>
