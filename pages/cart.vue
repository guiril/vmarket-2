<template>
  <div>
    <Navbar />
    <v-container>
      <nav>
        <v-breadcrumbs :items="subNavbar" />
      </nav>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="10"
        >
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header class="d-flex justify-space-between">
                <h3 class="text-caption font-weight-regular">
                  顯示購物車細節
                </h3>
                <span
                  class="text-h6 text-right"
                  :class="{ 'success--text': finalTotal !== total }"
                >
                  {{ finalTotal | currency }}
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
                      mobile-breakpoint="0"
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
                        <span
                          v-if="item.coupon"
                          class="d-block success--text"
                        >
                          已套用優惠券
                        </span>
                      </template>
                      <template v-slot:[`item.qty`]="{ item }">
                        {{ item.qty }} 回
                      </template>
                      <template v-slot:[`item.total`]="{ item }">
                        <span :class="{ 'success--text': item.coupon }">
                          {{ item.final_total | currency }}
                        </span>
                      </template>
                      <template v-slot:[`body.append`]>
                        <tr>
                          <td
                            colspan="4"
                            class="text-right"
                          >
                            合計
                          </td>
                          <td class="text-h6">
                            <span v-if="finalTotal === total">
                              {{ total | currency }}
                            </span>
                            <del v-else>{{ total | currency }}</del>
                          </td>
                        </tr>
                        <tr v-if="finalTotal !== total">
                          <td
                            colspan="4"
                            class="text-right"
                          >
                            折扣價
                          </td>
                          <td class="text-h6 success--text">
                            {{ finalTotal | currency }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                <v-row justify="end">
                  <v-col
                    cols="12"
                    sm="6"
                    class="pt-0 text-right"
                  >
                    <v-text-field
                      v-model="couponCode"
                      placeholder="輸入 coupon001 享有八折優惠"
                      color="warning"
                      :success-messages="couponSuccess"
                      :error-messages="couponError"
                      @keyup.enter="useCoupon"
                    />
                    <v-btn
                      color="warning"
                      :loading="isCouponSubmit"
                      @click.prevent="useCoupon"
                    >
                      套用優惠碼
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="8"
        >
          <v-row>
            <v-col cols="12">
              <h3 class="grey lighten-4 text-center py-4">
                訂購人資料
              </h3>
            </v-col>
          </v-row>
          <client-only>
            <ValidationObserver
              ref="observer"
              v-slot="{ validate }"
            >
              <v-form>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="orderForm.user.name"
                      label="姓名"
                    />
                  </v-col>
                  <v-col cols="6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Email"
                      rules="required|email"
                    >
                      <v-text-field
                        v-model="orderForm.user.email"
                        label="Email"
                        :error-messages="errors"
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="聯絡電話"
                      :rules="{ required: true, regex: /^[0-9]+$/ }"
                    >
                      <v-text-field
                        v-model="orderForm.user.tel"
                        label="電話"
                        :error-messages="errors"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="orderForm.user.address"
                      label="地址"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="備註"
                      rules="required"
                    >
                      <v-textarea
                        v-model="orderForm.user.message"
                        rows="2"
                        label="備註"
                        :error-messages="errors"
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-end">
                    <v-btn
                      to="/"
                      class="mr-3"
                      outlined
                    >
                      繼續選購
                    </v-btn>
                    <v-btn
                      :loading="isSubmit"
                      class="white--text"
                      color="rgba(14, 14, 14, 0.99)"
                      @click.prevent="submit"
                    >
                      確認訂單
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </ValidationObserver>
          </client-only>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/TheFooter';
import Navbar from '~/components/TheNavbar.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      isSubmit: false,
      orderForm: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isTooltipShow: false,
      isCouponSubmit: false,
      couponCode: '',
      couponError: '',
      couponSuccess: '',
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
    finalTotal() {
      return this.$store.state.cart.finalTotal;
    },
    isCartLoading() {
      return this.$store.state.cart.isLoading;
    },
  },
  methods: {
    async useCoupon() {
      this.couponSuccess = '';
      this.couponError = '';

      if (!this.couponCode) {
        this.couponError = '請輸入優惠券代碼';
        return;
      }

      this.isCouponSubmit = true;

      const res = await this.$axios.$post(`${this.$config.apiPath
      }/api/${this.$config.customPath}/coupon`, {
        data: {
          code: this.couponCode,
        },
      });

      this.isCouponSubmit = false;

      if (!res.success) {
        this.couponError = res.message;
        this.couponSuccess = '';
      } else {
        this.couponSuccess = res.message;
        this.couponError = '';
      }

      this.couponCode = '';
      this.$store.dispatch('cart/getCarts');
    },
    async removeItem(id) {
      await this.$store.dispatch('cart/removeCartItem', id);
      this.$store.dispatch('cart/getCarts');
    },
    async createOrder() {
      const res = await this.$axios.$post(`${this.$config.apiPath
      }/api/${this.$config.customPath}/order`, {
        data: this.orderForm,
      });

      this.$router.push(`checkout/${res.orderId}`);
    },
    async submit() {
      this.isSubmit = true;

      const result = await this.$refs.observer.validate();

      if (result) {
        this.createOrder();
      } else {
        this.isSubmit = false;
      }
    },
  },
};
</script>
