<template>
  <v-carousel
    cycle
  >
    <v-carousel-item
      v-for="(item, index) in slides"
      :key="index"
      :src="item.src"
    />
  </v-carousel>
</template>

<script>
export default {
  name: 'HomeCarousel',
  data() {
    return {
      slides: [
        { src: 'images/slide/01-avengers.jpg' },
        { src: 'images/slide/02-captain.jpg' },
        { src: 'images/slide/03-hulk.jpg' },
        { src: 'images/slide/04-ironman.jpg' },
        { src: 'images/slide/05-thor.jpg' },
      ],
    };
  },
};
</script>
