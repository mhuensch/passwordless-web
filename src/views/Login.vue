<template lang="pug">
  <div>
    loginform(
      :sent="sent" 
      @send="onSendEmail" 
      @verify="onVerifyCode")
  </div>
</template>

<script>
  import logger from 'loglevel'
  import LoginForm from '@/components/LoginForm.vue'
  import socket from '@/modules/socket.js'
  import api from '@/modules/api.js'
  
  function data () {
    let model = 
      { email: null
      , code: null
      , sending: false
      , sent: false
      }
    return model
  }
  
  async function onSendEmail (data) {
    await api.sendAuthEmail(data.email)
    this.sent = true
  }

  async function onVerifyCode (data) {
    await api.verifyAuthCode(data.email, data.code)
    this.$router.push('/demo')
  }

  let module =
    { name: 'login'
    , data
    , methods: 
      { onSendEmail
      , onVerifyCode
      }
    }

  export default module
</script>

<style scoped>

</style>
