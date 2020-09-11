<template>
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
        是否確定刪除 <strong class="light--text">{{ product }}</strong>？（注意：刪除後將無法恢復。）
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
          @click.prevent="$emit('close')"
        >
          取消
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isDeleteModalOpen: {
      type: Boolean,
      default: false,
    },
    product: {
      type: String,
      default: '',
    },
  },
  methods: {
    deleteProduct() {
      this.$emit('deleteProduct');
    },
  },
};
</script>
