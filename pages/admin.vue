<template>
  <client-only>
    <div class="wrap">
      <Header />
      <v-container>
        <v-row>
          <v-col cols="2">
            <Sidebar />
          </v-col>
          <v-col cols="10">
            <nuxt-child keep-alive />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </client-only>
</template>

<script>
import Header from '~/components/AdminHeader.vue';
import Sidebar from '~/components/AdminSidebar.vue';

export default {
  name: 'Admin',
  components: {
    Header,
    Sidebar,
  },
  created() {
    const cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$axios.defaults.headers.common.Authorization = cookieToken;
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding-top: 64px;
}
</style>
