<template lang="pug">
  div.content
    p
      div Whoops, 404! 
        b {{path}}
        span  was 
        span.bad not found.
      div
        | You might want to 
        input(type="button" value="Go Back" @click="onGoBack")
        | &nbsp; or &nbsp; 
        router-link(to="/home") Go Home
        span .
</template>

<script>
  function path () {
    const fullPath = this.$route.fullPath
    return fullPath === '/notfound'
      ? 'The given path'
      : this.$route.fullPath
  }
  
  function onGoBack () {
    this.$router.back()
  }

  let module =
    { name: 'notfound'
    , computed: { path }
    , methods: { onGoBack }
    }
  export default module
</script>

<style scoped>
  .content {
    text-align: center;
  }
  
  .info {
    margin-top: 1em;
  }
  
  .bad {
    color: var(--color-bad);
  }
</style>