<template>
  <div class="other">
    {{ title }}
    <button @click="changeTitle">Change</button>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        title: 'Welcome to other!'
      }
    },
    methods: {
      changeTitle () {
        this.title = 'Boo !'
      }
    }
  }

</script>

<style scoped>
  .other {
    background: grey;
  }
</style>
