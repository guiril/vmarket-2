<template>
  <v-card min-width="300">
    <v-card-title class="justify-center">
      購物車商品
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="carts"
      no-data-text="購物車還是空的喔！"
      hide-default-header
      hide-default-footer
      :items-per-page="Number(50)"
      :loading="isCartLoading"
    >
      <template v-slot:[`item.delete`]="{ item }">
        <v-icon @click.prevent="removeItem(item.id)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:[`item.title`]="{ item }">
        {{ item.product.title }}
      </template>
      <template v-slot:[`item.qty`]="{ item }">
        {{ item.qty }} 回
      </template>
      <template v-slot:[`item.total`]="{ item }">
        {{ item.total | currency }}
      </template>
      <template v-slot:[`body.append`]>
        <tr>
          <td
            colspan="3"
            class="text-right"
          >
            總金額
          </td>
          <td>{{ total | currency }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-card-actions>
      <v-btn
        class="mx-auto"
        block
        color="primary"
        to="/cart"
      >
        前往購物車
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TheCart',
  data() {
    return {
      headers: [
        { value: 'delete' },
        { value: 'title' },
        { value: 'qty' },
        { value: 'total' },
      ],
    };
  },
  computed: {
    carts() {
      return this.$store.state.cart.carts;
    },
    total() {
      return this.$store.state.cart.total;
    },
    isCartLoading() {
      return this.$store.state.cart.isLoading;
    },
  },
  created() {
    this.getCart();
  },
  methods: {
    async removeItem(id) {
      await this.$store.dispatch('cart/removeCartItem', id);
      this.getCart();
    },
    getCart() {
      this.$store.dispatch('cart/getCarts');
    },
  },
};
</script>
