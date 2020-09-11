<template>
  <nav class="col col-2 sidebar grey lighten-5">
    <div class="sidebar-sticky">
      <h6>商店後台</h6>
    </div>
    <v-list
      nav
      class="transparent"
    >
      <v-list-item to="/admin/products">
        <v-list-item-title>商品管理</v-list-item-title>
      </v-list-item>
      <v-list-item to="/admin/orders">
        <v-list-item-title>訂單管理</v-list-item-title>
      </v-list-item>
      <v-list-item to="/admin/coupons">
        <v-list-item-title>優惠券管理</v-list-item-title>
      </v-list-item>
    </v-list>
  </nav>
</template>

<script>
export default {
  name: 'AdminSidebar',
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 80px 15px 0 !important;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}
</style>
