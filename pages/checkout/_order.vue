<template>
  <div>
    <Navbar />
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
        >
          <v-data-table
            :headers="headersProduct"
            :items="products"
            hide-default-footer
            disable-sort
          >
            <template v-slot:[`item.title`]="{ item }">
              {{ item.product.title }}
            </template>
            <template v-slot:[`item.price`]="{ item }">
              {{ item.product.price | currency }}
            </template>
            <template v-slot:[`body.append`]>
              <tr>
                <td
                  colspan="2"
                  class="text-right"
                >
                  應付金額
                </td>
                <td class="text-h6">
                  {{ order.total | currency }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
        >
          <div class="v-data-table theme--light">
            <div class="v-data-table__wrapper">
              <table>
                <tbody>
                  <tr>
                    <th width="150">
                      Email
                    </th>
                    <td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="!order.is_paid">尚未付款</span>
                      <span
                        v-else
                        class="success--text"
                      >
                        付款完成
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <v-row v-if="!order.is_paid">
            <v-col class="d-flex justify-center mt-5">
              <v-btn
                :loading="isSubmit"
                large
                class="white--text"
                color="rgba(14, 14, 14, 0.99)"
                @click.prevent="payOrder"
              >
                確認付款
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <CartButton />
  </div>
</template>

<script>
import Navbar from '~/components/TheNavbar.vue';
import CartButton from '~/components/CartButton.vue';

export default {
  components: {
    Navbar,
    CartButton,
  },
  async asyncData({ $axios, $config: { apiPath, customPath }, params }) {
    const id = params.order;
    const res = await $axios.$get(`${apiPath}/api/${customPath
    }/order/${id}`);

    return {
      orderId: id,
      order: res.order,
    };
  },
  data() {
    return {
      isSubmit: false,
      orderId: '',
      order: {},
      headersProduct: [
        { value: 'title', text: '商品' },
        { value: 'qty', text: '觀看次數' },
        { value: 'price', text: '單價' },
      ],
    };
  },
  computed: {
    products() {
      return Object.values(this.order.products);
    },
  },
  methods: {
    async getOrder() {
      const res = await this.$axios.$get(`${this.$config.apiPath}/api/${this.$config.customPath
      }/order/${this.id}`);
      this.order = res.order;
    },
    async payOrder() {
      this.isSubmit = true;
      const res = await this.$axios.$post(`${this.$config.apiPath
      }/api/${this.$config.customPath}/pay/${this.orderId}`);

      this.isSubmit = false;

      if (res.success) {
        this.getOrder();
      }
    },
  },
};
</script>
