<template>
  <div>
    <h1>你的文字哦：{{text}}</h1>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      text: this.$route.params.text
    }
  }
}
</script>

<style scoped>

</style>
