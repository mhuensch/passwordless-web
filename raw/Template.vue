<template lang="pug">
  div.demo demo
</template>

<script>
  function data () {
    let model = 
      {
      }
    return model
  }

  let module =
    { name: 'demo'
    , data
    }

  export default module
</script>

<style lang="postcss" scoped>
  .demo {
    background-color: grey;
  }
</style>
