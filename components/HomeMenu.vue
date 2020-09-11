<template>
  <v-list
    dark
    color="rgba(14, 14, 14, 0.99)"
    class="rounded"
  >
    <v-list-item-group v-model="activeIndex">
      <v-list-item
        v-for="(category, index) in categories"
        :key="index"
        class="rounded-0"
        @click="activeText = category.text"
      >
        <v-list-item-icon>
          <v-icon
            style="color: #e3dfcf;"
            v-text="category.icon"
          />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            style="color: #e3dfcf;"
            v-text="category.text"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'HomeMenu',
  data() {
    return {
      activeIndex: 0,
      activeText: '全部電影',
      categories: [
        { text: '全部電影', icon: 'theaters' },
        { text: '復仇者', icon: 'theaters' },
        { text: '復仇者聯盟', icon: 'theaters' },
        { text: '無限寶石', icon: 'theaters' },
      ],
    };
  },
};
</script>

<style>

</style>
