<template>
  <div>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <v-card ref="form">
          <v-card-title class="text-h5 font-weight-bold">
            請先登入
          </v-card-title>
          <v-card-text>
            <v-form
              class="text-center"
              open-on-focus
              @submit.prevent="login"
            >
              <v-text-field
                ref="account"
                v-model="user.username"
                label="Email address"
                prepend-inner-icon="mail"
                autofocus
              />
              <v-text-field
                ref="password"
                v-model="user.password"
                type="password"
                label="Password"
                prepend-inner-icon="lock"
              />
              <v-btn
                class="mx-auto"
                color="rgba(14, 14, 14, 0.99);"
                dark
                min-width="200"
                type="submit"
                :loading="isLoading"
                @click="login"
              >
                登入
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      const res = await this.$axios.post(`${this.$config.apiPath}/admin/signin`, this.user);
      if (res.data.success) {
        this.isLoading = false;
        this.$router.push('admin/products');
      }
    },
  },
};
</script>

<style>

</style>
