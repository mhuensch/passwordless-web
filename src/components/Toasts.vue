<template lang="pug">
  div.toasts toasts
</template>

<script>
  import toastmaster from '@/modules/toastmaster.js'

  function data () {
    let model = 
      { toasts: []
      }
    return model
  }
  
  function created () {
    toastmaster.$on('toast', this.onToast)
  }
  
  function beforeDestroy () {
    toastmaster.$off('toast', this.onToast)
  }
  
  function onToast (toast) {
    console.log('TOAST VIEW', toast)
  }

  let module =
    { name: 'toasts'
    , data
    , created
    , beforeDestroy
    , methods:
      { onToast
      }
    }

  export default module
</script>

<style lang="postcss" scoped>
  .toasts {
    background-color: grey;
  }
</style>
