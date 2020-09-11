<template>
  <div>
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
};
</script>

<style>

</style>
