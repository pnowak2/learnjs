<template>
  <div class="searchWrapper">
    <input
      id="search"
      name="search"
      v-model="searchValue"
      @input="handleInput">
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

const API = 'https://images-api.nasa.gov/search';

export default {
  name: 'SearchInput',
  data() {
    return {
      searchValue: '',
    };
  },
  methods: {
    // eslint-disable-next-line
    handleInput: debounce(function() {
      axios
        .get(`${API}?q=${this.searchValue}&media_type=image`)
        .then((response) => {
          this.results = response.data.collection.items;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500),
  },
};
</script>

<style lang="scss" scoped>
  .searchWrapper {
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-top: 50px;
  }

  input {
    height: 30px;
    border: 0;
    background: none;
    border-bottom: 1px solid black;
  }
</style>
