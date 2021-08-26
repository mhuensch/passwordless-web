<template lang="pug">
  div(id="app")
    div.nav(id="nav")
      router-link(to="/home") Home
      span |
      router-link(to="/demo") Demo
      span |
      
      template(v-if="api.token && api.token !== 'none'")
        router-link(to="/protected") Protected
        span |
        button(@click="onLogout") Logout
      
      template(v-else)
        <router-link to="/login">Login</router-link>
    
    div.notifications 
      toasts
    
    h1.title Kickstart 
      icon.arrow(icon="play")
        
    router-view
</template>


<script>
  import logger from 'loglevel'
  import local from '@/modules/local.js'
  import api from '@/modules/api.js'
  
  function data () {
    let model = 
      { api: api
      }
    return model
  }

  function mounted () {
    this.$emit('toast', { title: 'test'})
  }

  function isLoggedIn () {
    return api.token
  }
  
  async function onLogout () {
    let response = await api.request('GET', '/disconnect')
    logger.info('API DISCONNECTED', response)
    api.token = 'none'
    this.$router.push('/login')
  }

  let module =
    { name: 'app'
    , data
    , mounted
    , methods:
      { isLoggedIn
      , onLogout
      }
    }

  export default module
</script>

<style scoped>
  @import 'assets/styles/index.css';
  
  .nav {
    text-align: center;
  }

  .title {
    text-align: center;
    margin-top: 1em;
    font-size: 1.5em;
  }

  .notifications {
    border: 1px solid white;
    position: absolute;
    right: 0;
    top: 0;
  }

</style>
