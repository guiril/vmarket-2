<template>
  <header class="header">
    <v-toolbar style="background-color: rgba(14, 14, 14, 0.99);">
      <v-btn
        icon
        style="color: #e3dfcf;"
        to="/"
      >
        <v-icon style="color: #e3dfcf;">
          home
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        text
        style="color: #e3dfcf;"
        @click.prevent="logout"
      >
        <v-icon class="mr-1">
          account_box
        </v-icon>
        Log out
      </v-btn>
    </v-toolbar>
  </header>
</template>

<script>
export default {
  name: 'AdminHeader',
  methods: {
    async logout() {
      const res = await this.$axios.post(`${this.$config.apiPath}/logout`);
      if (res.data.success) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 101;
}
</style>
