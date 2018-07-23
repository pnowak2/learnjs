<template>
  <div :style="style" class="item"></div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: this.item.data[0].title,
      photo: this.item.links[0].href,
    };
  },
  computed: {
    style() {
      return `background-image: url(${this.photo})`;
    },
  },
  // mounted() {
  //   this.title = this.item.data[0].title;
  //   this.photo = this.item.links[0].href;
  // },
};
</script>

<style lang="scss" scoped>
.item {
  width: 40vw;
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;

  @media(min-width: 768px) {
    width: 25vw;
  }
}
</style>

