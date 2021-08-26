import Vue from 'vue'
import Component from 'vue-class-component'
import socketio from 'socket.io-client'
import logger from 'loglevel'
import api from '@/modules/api.js'

@Component
class Socket extends Vue {
  created () {
    api.$on('token', this.onApiTokenChaged)
    
    this.io = socketio('localhost:8081', { auth: { token: api.token }})
    this.io.on('connect', this.onConnected)
    this.io.on('disconnect', this.onDisconnected)
    this.io.on('unauthorized', this.onUnauthorized)
    this.io.on('error', this.onError)
  }
  
  data () {
    let model = 
      { io: null
      , status: 'disconnected'
      }
    return model
  }
  
  onApiTokenChaged (token) {
    this.io.auth.token = token
    this.io.open()
  }
  
  onConnected () {
    this.status = 'connected'
    logger.log('SOCKET STATUS', 'connected')
  }

  onDisconnected () {
    this.status = this.status === 'unauthorized' ? 'unauthorized' : 'disconnected'
    logger.log('SOCKET STATUS', 'disconnected')
  }

  async onUnauthorized (reason) {
    this.status = 'unauthorized'
    logger.log('SOCKET ERROR', reason)
    await api.refreshToken()
  }

  onError (reason) {
    console.error('Unable to connect socket.io', reason)
  }
  
  emit (event, options) {
    options = options || {}
    io.emit(event, JSON.stringify(options))
  }
}

const socket = new Socket()
export default socket