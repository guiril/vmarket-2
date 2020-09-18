<template>
  <div>
    <div class="text-right">
      <v-btn
        class="white--text"
        color="rgba(14, 14, 14, 0.99)"
        @click.prevent="openUpdateModal(null ,true)"
      >
        新增優惠券
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="coupons"
      hide-default-footer
      disable-sort
      :loading="isLoading"
    >
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
      class="mt-5"
      circle
      color="warning"
      @input="getCoupons"
    />
    <v-dialog
      v-model="isUpdateModalOpen"
      max-width="500px"
      dark
      open-on-focus
    >
      <v-card>
        <v-card-title class="headline">
          <span v-if="isNew">新增優惠券</span>
          <span v-else>編輯優惠券</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="tempCoupon.title"
                  label="名稱"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="tempCoupon.percent"
                  label="折扣 %"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="dueDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="tempCoupon.due_date"
                      label="到期日"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="tempCoupon.due_date"
                    @input="dueDateMenu = false"
                  />
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="tempCoupon.code"
                  label="優惠碼"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-checkbox
                  v-model="tempCoupon.is_enabled"
                  label="是否啟用"
                />
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
            @click.prevent="updateCoupon"
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
          刪除優惠券？
        </v-card-title>
        <v-card-text class="text-subtitle-1">
          是否確定刪除 <strong class="light--text">{{ tempCoupon.title }}</strong>？（注意：刪除後將無法恢復。）
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            outlined
            color="#e3dfcf"
            @click="deleteCoupon"
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
  name: 'AdminCoupons',
  middleware: 'routerAuth',
  meta: {
    requiresAuth: true,
  },
  async asyncData({ $axios, $config: { apiPath, customPath } }, page = 1) {
    const res = await $axios.$get(`${apiPath}/api/${customPath
    }/admin/coupons?page=${page}`);
    // console.log(res);
    return {
      coupons: res.coupons,
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
      dueDateMenu: false,
      coupons: [],
      pagination: {},
      tempCoupon: {},
      headers: [
        { text: '優惠券名稱', value: 'title' },
        { text: '優惠券代碼', value: 'code' },
        { text: '到期日', value: 'due_date' },
        { text: '折扣百分比 (%)', value: 'percent' },
        { text: '是否啟用', value: 'is_enabled' },
        { text: '編輯', value: 'edit' },
      ],
    };
  },
  methods: {
    async getCoupons(page) {
      this.isLoading = true;

      const res = await this.$axios.$get(`${this.$config.apiPath
      }/api/${this.$config.customPath}/admin/coupons?page=${page}`);

      this.coupons = res.coupons;
      this.pagination = res.pagination;
      this.isLoading = false;
    },
    openUpdateModal(item, isNew) {
      this.isUpdateModalOpen = true;
      this.isNew = isNew;
      this.tempCoupon = !isNew ? { ...item } : {};
    },
    openDeleteModal(item) {
      this.isDeleteModalOpen = true;
      this.tempCoupon = { ...item };
    },
    async updateCoupon() {
      this.modalIsLoading = true;

      let api = `${this.$config.apiPath
      }/api/${this.$config.customPath}/admin/coupon`;
      let method = '$post';

      if (!this.isNew) {
        api = `${this.$config.apiPath
        }/api/${this.$config.customPath}/admin/coupon/${this.tempCoupon.id}`;
        method = '$put';
      }
      await this.$axios[method](api, {
        data: this.tempCoupon,
      });
      this.modalIsLoading = false;
      this.isUpdateModalOpen = false;
      this.getCoupons();
      // console.log(res);
    },
    async deleteCoupon() {
      await this.$axios.$delete(`${this.$config.apiPath
      }/api/${this.$config.customPath}/admin/coupon/${this.tempCoupon.id}`);
      this.isDeleteModalOpen = false;
      this.getCoupons();
    },
  },
};
</script>

<style>

</style>
