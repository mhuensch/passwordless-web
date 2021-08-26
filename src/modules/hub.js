// Define our global event bus to make the following availiable to all components:
// eventHub.$on: start listening for events
// eventHub.$off: stop listening for events
// eventHub.$emit: send events to all listeners
import Vue from 'vue'
import logger from 'loglevel'

let eventHub = new Vue()

let $emit = eventHub.$emit
eventHub.$emit = (...args) => {
  logger.log('EMITTING', args)
  $emit.apply(eventHub, args)
}
 

export default eventHub