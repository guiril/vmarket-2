<template>
  <div>
    <Navbar />
    <Carousel />
    <v-container>
      <v-row>
        <v-col cols="3">
          <Menu @changeCategory="changeCategory" />
        </v-col>
        <v-col cols="9">
          <v-row>
            <v-col cols="5">
              <v-text-field
                v-model="filter"
                label="Search"
                append-icon="search"
                color="warning"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="(product, index) in filteredProducts"
              :key="index"
              sm="6"
              md="4"
              class="pt-0"
            >
              <v-card
                height="100%"
                class="d-flex flex-column"
              >
                <div
                  class="card-img"
                  :style="`backgroundImage: url('${product.imageUrl}');`"
                />
                <div style="flex: 1 1 auto;">
                  <v-card-title>
                    <h2 class="text-h6">
                      {{ product.title }}
                    </h2>
                  </v-card-title>
                  <v-card-text>
                    <div class="text-right">
                      <v-chip
                        color="warning"
                        class="mb-3"
                        small
                      >
                        {{ product.category }}
                      </v-chip>
                    </div>
                    <p>
                      {{ product.description }}
                    </p>
                    <div class="d-flex justify-space-between">
                      <del>原價 {{ product.origin_price }}</del>
                      <div>特價 {{ product.price }}</div>
                    </div>
                  </v-card-text>
                </div>
                <v-card-actions class="justify-center">
                  <v-btn
                    outlined
                    color="rgba(14, 14, 14, 0.99)"
                    @click.prevent="checkDetail(product.id)"
                  >
                    電影介紹
                  </v-btn>
                  <v-btn
                    class="white--text"
                    color="rgba(14, 14, 14, 0.99)"
                    @click.prevent="addtoCart(product.id)"
                  >
                    加入購物車
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-pagination
            v-if="pagination && !filter && activeCategory === '全部電影'"
            v-model="pagination.current_page"
            :length="pagination.total_pages"
            :total-visible="5"
            class="mt-5"
            circle
            color="warning"
            @input="getProducts"
          />
          <h3
            v-if="filteredProducts.length === 0"
            class="text-center"
          >
            找不到資料
          </h3>
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
import Carousel from '~/components/HomeCarousel.vue';
import Menu from '~/components/ProductsMenu.vue';
import CartButton from '~/components/CartButton.vue';

export default {
  components: {
    Navbar,
    Footer,
    Carousel,
    Menu,
    CartButton,
  },
  async asyncData({ $axios, $config: { apiPath, customPath } }, page = 1) {
    const res = await $axios.$get(`${apiPath}/api/${customPath
    }/products?page=${page}`);

    const res2 = await $axios.$get(`${apiPath}/api/${customPath
    }/products/all`);

    return {
      products: res.products,
      pagination: res.pagination,
      allProducts: res2.products,
    };
  },
  data() {
    return {
      activeCategory: '全部電影',
      filter: '',
      allProducts: [],
      products: [],
      pagination: {},
    };
  },
  computed: {
    filteredProducts() {
      const vm = this;
      let products = [];
      if (this.activeCategory === '全部電影' && !this.filter) {
        products = this.products;
      } else if (!this.filter) {
        products = this.allProducts.filter((el) => el.category === vm.activeCategory);
      } else {
        products = this.allProducts.filter((el) => el.title.match(vm.filter));
      }
      return products;
    },
    // isCartLoading() {
    //   return this.$store.state.cart.isLoading;
    // },
  },
  methods: {
    async getProducts(page) {
      const res = await this.$axios.$get(`${this.$config.apiPath
      }/api/${this.$config.customPath}/products?page=${page}`);

      this.products = res.products;
      this.pagination = res.pagination;
    },
    checkDetail(id) {
      this.$router.push(`product/${id}`);
    },
    async addtoCart(id) {
      await this.$store.dispatch('cart/addtoCart', {
        id,
        qty: 1,
      });
      this.$store.dispatch('cart/getCarts');
    },
    changeCategory(category) {
      this.activeCategory = category;
    },
  },
};
</script>

<style>
.card-img {
  height: 350px;
  background-size: cover;
  background-position: center center;
}
</style>
