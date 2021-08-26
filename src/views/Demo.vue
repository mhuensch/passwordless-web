<template lang="pug">
  div.content
    h2.title Dashboard
    
    div.component 
      h3 Axios HTTP API
      div.token access token: {{api.token}}
      div.token refresh token: {{getRefreshToken()}}
      button(@click="onGetUserInfo") Demo: Get User Info
      button(@click="onClearToken") Demo: Clear Access Token

    div.component
      h3 Socket.io
      div status: {{socket.status}}
</template>

<script>
  import logger from 'loglevel'
  import api from '@/modules/api'
  import socket from '@/modules/socket'

  function data () {
    let model =
      { api: api
      , socket: socket
      }
    return model
  }
  
  async function onGetUserInfo () {
    let info = await api.getUserInfo()
    logger.info('ACCOUNT INFO', info)
  }
  
  function onClearToken () {
    api.token = 'none'
  }
  
  function getRefreshToken () {
    let cookies = document.cookie.match('(^|;)\\s*auth0token\\s*=\\s*([^;]+)');
    let result = cookies ? cookies.pop() : '';
    if (result.length === 0) result = '[only visible if the API index.js session_options.cookie.httpOnly === false]'
    return result
  }

  let module =
    { name: 'demo'
    , data: data
    , methods:
      { onGetUserInfo
      , onClearToken
      , getRefreshToken
      }
    }

  export default module
</script>

<style scoped>
  .content {
    max-width: 800px;
    margin: auto;
  }

  .title {
    text-align: center;
  }
  
  .token {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .component {
    margin: 2em 0 1em 0;
  }
  
  button, input[type=button] {
    display: block;
  }
</style>