<template>
  <div>
    <v-app>
      <Nuxt />
      <Alert />
    </v-app>
  </div>
</template>

<script>
import Alert from '@/components/TheAlert';

export default {
  components: {
    Alert,
  },
};
</script>
