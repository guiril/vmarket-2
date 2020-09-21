<template>
  <div>
    <Navbar />
    <v-container>
      <nav>
        <v-breadcrumbs :items="subNavbar" />
      </nav>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-img :src="product.imageUrl" />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <h2>{{ product.title }}</h2>
          <hr class="my-3">
          <v-chip
            class="my-3"
            color="warning"
          >
            {{ product.category }}
          </v-chip>
          <p>{{ product.description }}</p>
          <p>{{ product.content }}</p>
          <hr class="my-3">
          <div
            v-if="product.price"
            class="d-flex justify-space-between"
          >
            <div
              v-if="!product.price"
              class=""
            >
              售價 {{ product.origin_price | currency }}
            </div>
            <del
              v-if="product.price"
              class=""
            >
              原價 {{ product.origin_price | currency }}
            </del>
            <div
              v-if="product.price"
              class=""
            >
              特價 <b>{{ product.price | currency }}</b>
            </div>
          </div>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              class="d-flex align-center"
            >
              <v-select
                v-model="quantify"
                label="觀看回數"
                :items="quantifyAry"
              />
            </v-col>
            <v-col
              cols="12"
              s="6"
              class="d-flex align-center"
            >
              <v-btn
                block
                class="white--text"
                color="rgba(14, 14, 14, 0.99)"
                :loading="isCartLoading"
                @click.prevent="addtoCart(product.id)"
              >
                加入購物車
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
    <CartButton />
  </div>
</template>

<script>
import Footer from '@/components/TheFooter';
import Navbar from '~/components/TheNavbar.vue';
import CartButton from '~/components/CartButton.vue';

export default {
  components: {
    Navbar,
    Footer,
    CartButton,
  },
  async asyncData({ $axios, $config: { apiPath, customPath }, params }) {
    const id = params.product;
    const res = await $axios.$get(`${apiPath}/api/${customPath
    }/product/${id}`);
    // console.log(res);
    return {
      product: res.product,
    };
  },
  data() {
    return {
      subNavbar: [
        { href: '/', text: '首頁' },
        { text: '電影介紹' },
      ],
      product: {},
      quantify: 1,
      selectText: '回',
    };
  },
  computed: {
    quantifyAry() {
      const aryLength = 10;
      const ary = Array.from({ length: aryLength }, (v, i) => i + 1);
      return ary;
    },
    isCartLoading() {
      return this.$store.state.cart.isLoading;
    },
  },
  methods: {
    async addtoCart(id) {
      await this.$store.dispatch('cart/addtoCart', {
        id,
        qty: this.quantify,
      });
      this.$store.dispatch('cart/getCarts');
    },
  },
};
</script>
