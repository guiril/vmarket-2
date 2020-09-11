<template>
  <div>
    <Navbar />
    <v-container>
      <nav>
        <v-breadcrumbs :items="subNavbar" />
      </nav>
      <v-row justify="center">
        <v-col cols="10">
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header class="d-flex justify-space-between">
                <h3 class="text-caption font-weight-regular">
                  顯示購物車細節
                </h3>
                <span class="text-h6 text-right">
                  {{ total | currency }}
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers"
                      :items="carts"
                      hide-default-footer
                      disable-sort
                      no-data-text="購物車還是空的喔！"
                      :loading="isCartLoading"
                    >
                      <template v-slot:[`item.delete`]="{ item }">
                        <v-icon @click.prevent="removeItem(item.id)">
                          mdi-delete
                        </v-icon>
                      </template>
                      <template v-slot:[`item.image`]="{ item }">
                        <img
                          :src="item.product.imageUrl"
                          class="d-inline-block py-2"
                          style="vertical-align: middle;"
                        >
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
                            合計
                          </td>
                          <td class="text-h6">
                            {{ total | currency }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                <v-row justify="end">
                  <v-col
                    cols="6"
                    class="pt-0"
                  >
                    <v-text-field
                      placeholder="請輸入優惠代碼"
                      color="warning"
                    >
                      <template v-slot:append>
                        <v-btn color="warning">
                          套用優惠碼
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/TheNavbar.vue';
import Footer from '~/components/TheFooter.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      subNavbar: [
        { href: '/', text: '首頁' },
        { text: '購物車' },
      ],
      headers: [
        { value: 'delete', width: 20 },
        { value: 'image', width: 120 },
        { value: 'title', text: '電影名稱' },
        { value: 'qty', text: '觀看回數' },
        { value: 'total', text: '小計' },
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
  methods: {
    async removeItem(id) {
      await this.$store.dispatch('cart/removeCartItem', id);
      this.$store.dispatch('cart/getCarts');
    },
  },
};
</script>
