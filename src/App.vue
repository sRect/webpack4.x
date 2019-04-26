<template>
  <div class="str">
    <b>{{str}}</b>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      str: 'hello world'
    }
  }
}
</script>

<style scoped>
.str {
  font-size: 20px;
}
</style>

