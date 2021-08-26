import logger from 'loglevel'
import axios from 'axios'
import Vue from 'vue'
import Component from 'vue-class-component'
import toastmaster from '@/modules/toastmaster.js'


@Component
class Api extends Vue {
  created () {
    this.$watch('token', this.onTokenChanged)
    axios.interceptors.response.use(null, this.handleAllErrors)
  }
  
  data () {
    let model =
      { token: 'none'
      }
    return model
  }
  
  onTokenChanged (newValue, oldValue) {
    this.$emit('token', newValue)
  }
  
  async request (method, url, data) {
    let baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8081'
    
    const options =
      { baseURL: baseURL
      , url: url
      , method: method
      , timeout: 5000
      , withCredentials: true
      , headers: {'content-type': 'application/json'}
      }

    if (data) options.data = data
    if (this.token) options.headers.authorization = `token ${this.token}`
    
    logger.info('AXIOS REQUEST', options)
    const response = await axios.request(options)
    logger.info('AXIOS RESPONSE', response)
    
    return response 
  }
  
  async handleAllErrors (error) {
    if (error.response.config.url == '/token' && error.response.status == 500) {
      logger.warn('Ignoring error while trying to get token from the api.')
      return error
    }
    
    let toast = null
    switch (error.response.status) {
      case 401:
        toast =
          { type: 'error'
          , title: 'Unauthorized'
          , message: 'You do not have access to this server.'
          , help: 'Try refreshing the page, changing your user, or logging in to fix the problem.'
          }
        break
      case 403:
        toast =
          { type: 'error'
          , title: 'Unauthorized'
          , message: 'You do not have access to this resource.'
          , help: 'You will need to log in as a different user to fix the problem.'
          }
        break
      default:
        toast =
          { type: 'error'
          , title: 'Server Error'
          , message: 'An error occured on the server.'
          , help: 'If this problem continues, please contact support.'
          }
    }

    toastmaster.toast(toast)
    return error
  }
  
  async sendAuthEmail (address) {
    logger.info('SENDING AUTH EMAIL', address)
    const response = await this.request('POST', '/send', { email: address })
    return response
  }
  
  async verifyAuthCode (address, code) {
    logger.info('VERIFYING AUTH', address, code)
    const response = await this.request('POST', '/verify', { email: address, code: code })
    this.token = response.data.token
    logger.info('API TOKEN SET', this.token)
  }
  
  async refreshToken () {
    logger.info('REFRESHING TOKEN')
    let response = await this.request('GET', '/token')
    if (response.data == null || response.data.token == null) return
    this.token = response.data.token
    logger.info('API TOKEN SET', this.token)
  }
  
  async disconnect () {
    logger.info('DISCONNECTING')
    let response = await this.request('GET', '/disconnect')
    this.token = 'none'
  }
  
  async getUserInfo () {
    logger.info('GETTING USER INFO')
    let response = await this.request('GET', '/info')
    return response.data
  }

}

const api = new Api()
export default api
