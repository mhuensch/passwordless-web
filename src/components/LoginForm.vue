<template lang="pug">
  div.content
    p Kickstart uses passwordless authentication to verify users.  Enter your email address below 
      | - so we can send you an <b>access code</b>.  We value your right to privacy 
      | as much as you do, so your email address will only be used for authentication unless 
      | you explicitly consent to other email communication.
    
    div.login-form
      form(v-on:submit.prevent)
        div.input-grid
          input(required type="text" v-model="email" name="email" id="email" autocomplete="email" :disabled="sending")
          button(@click="onSendEmail" :disabled="sending") Send My Code
          
          template(v-if="sent")
            input(type="text" v-model="code")
            button(@click="onVerifyCode") Verify My Code
</template>

<script>
  let props = 
    { sent: { type: Boolean, default: false }
    , sending: { type: Boolean, default: false }
    }
    
  function data () {
    let model = 
      { email: null
      , code: null
      }
    return model
  }

  function onSendEmail () {
    this.$emit('send', { email: this.email })
  }
  
  function onVerifyCode () {
    this.$emit('verify', { email: this.email, code: this.code })
  }
    
  let module =
    { name: 'loginform'
    , props
    , data
    , methods: 
      { onSendEmail
      , onVerifyCode
      }
    }
  export default module

</script>

<style scoped>
  .content {
    max-width: 800px;
    margin: auto;
  }

  .login-form {
    margin-top: 1em;
    text-align: center;
  }
  
  .input-grid {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 0.25em;
    row-gap: 0.5em;
  }
  
  form {
    display: inline-block;
  }
</style>
