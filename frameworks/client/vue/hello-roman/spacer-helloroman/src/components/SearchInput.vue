<template>
  <input
    id="search"
    name="search"
    :class="{ dark }"
    :value="value"
    @input="handleChange">
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>


<style lang="scss" scoped>
  input {
    margin-top: 50px;
    font-family: sans-serif;
    height: 30px;
    border: 0;
    background: none;
    font-size: 18px;
    font-weight: normal;
    border-bottom: 1px solid white;
    color: white;
    transition: box-shadow 0.5s ease-out;
    text-align: center;

    &:focus {
      outline: none;
      box-shadow: 0 10px 20px -8px rgba(255, 255, 255, 0.5);
    }

    @media (min-width: 1024px){
      font-weight: bold;
    }
  }

  .dark {
    color: #1e3d4a;
    border-bottom-color: #1e3d4a;

    &:focus {
      box-shadow: 0 10px 20px -8px rgba(#1e3d4a, 0.4);
    }
  }
</style>
