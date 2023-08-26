<template>
  <div>
    <Navbar />
    <v-row
      class="my-15"
      justify="center"
    >
      <v-col
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <v-card
          class="mx-auto"
          max-width="400"
          height="300"
        >
          <v-card-title class="text-h5 font-weight-bold">
            請先登入
          </v-card-title>
          <v-card-text>
            <client-only>
              <ValidationObserver
                ref="observer"
                v-slot="{ validate }"
              >
                <v-form
                  class="text-center"
                  open-on-focus
                  @submit.prevent="submit"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <v-text-field
                      ref="account"
                      v-model="user.username"
                      label="Email address"
                      prepend-inner-icon="mail"
                      :error-messages="errors"
                      autofocus
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Password"
                    rules="required"
                  >
                    <v-text-field
                      ref="password"
                      v-model="user.password"
                      type="password"
                      label="Password"
                      prepend-inner-icon="lock"
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                  <v-btn
                    class="mx-auto mt-5"
                    color="rgba(14, 14, 14, 0.99);"
                    dark
                    min-width="200"
                    type="submit"
                    :loading="isLoading"
                    @click.prevent="submit"
                  >
                    登入
                  </v-btn>
                </v-form>
              </ValidationObserver>
            </client-only>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/TheFooter';
import Navbar from '~/components/TheNavbar.vue';

export default {
  name: 'Login',
  components: {
    Navbar,
    Footer,
  },
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
    async submit() {
      this.isLoading = true;
      const result = await this.$refs.observer.validate();

      if (result) {
        this.login();
      } else {
        this.isLoading = false;
      }
    },
    async login() {
      const res = await this.$axios.post(`${this.$config.apiPath}/admin/signin`, this.user);

      if (res.data.success) {
        const { expired, token } = res.data;
        document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
        this.$router.push('admin/products');
      } else {
        this.isLoading = false;
        this.$bus.$emit('alertMessage', res.data.message);
      }
    },
  },
};
</script>

<style>

</style>
