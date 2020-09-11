<template>
  <div>
    <div class="text-right">
      <v-btn @click.prevent="openUpdateModal(null ,true)">
        新增商品
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="products"
      hide-default-footer
      disable-sort
      :loading="isLoading"
    >
      <template v-slot:[`item.origin_price`]="{ item }">
        {{ item.origin_price | currency }}
      </template>
      <template v-slot:[`item.price`]="{ item }">
        {{ item.price | currency }}
      </template>
      <template v-slot:[`item.is_enabled`]="{ item }">
        <span
          v-if="item.is_enabled"
          class="green--text"
        >
          啟用
        </span>
        <span
          v-else
          class="grey--text"
        >
          未啟用
        </span>
      </template>
      <template v-slot:[`item.edit`]="{ item }">
        <v-btn
          class="white--text"
          color="rgba(14, 14, 14, 0.99)"
          small
          @click="openUpdateModal(item, false)"
        >
          編輯
        </v-btn>
        <v-btn
          outlined
          small
          @click="openDeleteModal(item)"
        >
          刪除
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
      v-if="pagination"
      v-model="pagination.current_page"
      :length="pagination.total_pages"
      :total-visible="5"
      circle
      @input="getProducts"
    />
    <v-dialog
      v-model="isUpdateModalOpen"
      max-width="800px"
      dark
      open-on-focus
    >
      <v-card>
        <v-card-title class="headline">
          <span v-if="isNew">新增商品</span>
          <span v-else>編輯商品</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="tempProduct.title"
                  label="商品名稱"
                  required
                />
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="tempProduct.category"
                      label="商品類別"
                      required
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="tempProduct.unit"
                      label="商品單位"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="tempProduct.origin_price"
                      label="商品原價"
                      required
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="tempProduct.price"
                      label="商品售價"
                      required
                    />
                  </v-col>
                </v-row>
                <v-textarea
                  v-model="tempProduct.description"
                  rows="2"
                  label="商品描述"
                />
                <v-textarea
                  v-model="tempProduct.content"
                  rows="2"
                  label="說明內容"
                />
                <v-checkbox
                  v-model="tempProduct.is_enabled"
                  class="text-right"
                  label="是否啟用"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="圖片網址"
                  required
                />
                <v-btn block>
                  或 上傳圖片
                </v-btn>
                <img
                  class="mt-5"
                  :src="tempProduct.imageUrl"
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="isUpdateModalOpen = false"
          >
            取消
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="modalIsLoading"
            @click.prevent="updateProduct"
          >
            儲存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isDeleteModalOpen"
      dark
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline light--text">
          刪除商品？
        </v-card-title>
        <v-card-text class="text-subtitle-1">
          是否確定刪除 <strong class="light--text">{{ tempProduct.title }}</strong>？（注意：刪除後將無法恢復。）
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            outlined
            color="#e3dfcf"
            @click="deleteProduct"
          >
            刪除
          </v-btn>
          <v-btn
            color="#e3dfcf"
            style="color: rgba(14, 14, 14, 0.99);"
            @click.prevent="isDeleteModalOpen = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdminProducts',
  middleware: 'routerAuth',
  meta: {
    requiresAuth: true,
  },
  async asyncData({ $axios, $config: { apiPath, customPath } }, page = 1) {
    const res = await $axios.$get(`${apiPath}/api/${customPath
    }/admin/products?page=${page}`);
    // console.log(res);
    return {
      products: res.products,
      pagination: res.pagination,
      isLoading: false,
      modalIsLoading: false,
    };
  },
  data() {
    return {
      isUpdateModalOpen: false,
      isDeleteModalOpen: false,
      isLoading: true,
      isNew: true,
      products: [],
      pagination: {},
      tempProduct: {},
      headers: [
        { text: '類別', value: 'category' },
        { text: '名稱', value: 'title' },
        { text: '原價', value: 'origin_price' },
        { text: '售價', value: 'price' },
        { text: '是否啟用', value: 'is_enabled' },
        { text: '編輯', value: 'edit' },
      ],
    };
  },
  methods: {
    async getProducts(page) {
      this.isLoading = true;
      const res = await this.$axios.$get(`${this.$config.apiPath
      }/api/${this.$config.customPath}/admin/products?page=${page}`);
      // console.log(res);
      this.products = res.products;
      this.pagination = res.pagination;
      this.isLoading = false;
    },
    openUpdateModal(item, isNew) {
      this.isUpdateModalOpen = true;
      this.isNew = isNew;
      this.tempProduct = !isNew ? { ...item } : {};
    },
    openDeleteModal(item) {
      this.isDeleteModalOpen = true;
      this.tempProduct = { ...item };
      // console.log(`刪除${item}`);
    },
    async updateProduct() {
      this.modalIsLoading = true;

      let api = `${this.$config.apiPath
      }/api/${this.$config.customPath}/admin/product`;
      let method = '$post';

      if (!this.isNew) {
        api = `${this.$config.apiPath
        }/api/${this.$config.customPath}/admin/product/${this.tempProduct.id}`;
        method = '$put';
      }
      await this.$axios[method](api, {
        data: this.tempProduct,
      });
      this.modalIsLoading = false;
      this.isUpdateModalOpen = false;
      this.getProducts();
      // console.log(res);
    },
    async deleteProduct() {
      await this.$axios.$delete(`${this.$config.apiPath
      }/api/${this.$config.customPath}/admin/product/${this.tempProduct.id}`);
      this.isDeleteModalOpen = false;
      this.getProducts();
    },
  },
};
</script>

<style>

</style>
