<template>
  <v-alert
    v-model="alertStatus"
    type="error"
    class="alert-message"
    @outside="alertStatus = false"
  >
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      alertStatus: false,
      message: '',
    };
  },
  created() {
    const vm = this;

    this.$bus.$on('alertMessage', (message) => {
      vm.updateMessage(message);
    });
    // this.$nuxt.$on('alert-message', () => {
    //   this.alertStatus = true;
    // });
  },
  // beforeDestroy() {
  //   this.$nuxt.$off('alert-message');
  // },
  methods: {
    updateMessage(message) {
      this.alertStatus = true;
      this.message = message;

      setTimeout(() => {
        this.alertStatus = false;
        this.message = '';
      }, 5000);
    },
  },
};
</script>

<style>
.alert-message {
  max-width: 50%;
  position: fixed;
  top: 68px;
  right: 5px;
}
</style>
