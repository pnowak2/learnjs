<template>
  <div id="app">
    <uc-stock-price stock-symbol="AAPL"></uc-stock-price>
    <uc-stock-finder></uc-stock-finder>
  </div>
</template>

<script>

export default {
  name: "app",
  components: {
  },
};
</script>

<style>
:root {
  --color-primary: #3b013b;
  --color-primary-inverse: white;
  --color-primary-highlight: #750175;
}
</style>
