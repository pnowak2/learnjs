<template>
  <div class="wrapper">
    <Claim />
    <SearchInput />
  </div>
</template>

<script>
import Claim from '@/components/Claim.vue';
import SearchInput from '@/components/SearchInput.vue';

export default {
  name: 'Search',
  components: {
    Claim,
    SearchInput,
  },
  data() {
    return {
      results: [],
    };
  },

};
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    height: 100vh;
    padding: 30px;
    width: 100%;
    background-image: url(../assets/heroimage.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 80% 0%;
  }
</style>

