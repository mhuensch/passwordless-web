import logger from 'loglevel'
import Vue from 'vue'
import Component from 'vue-class-component'

const toast_template = 
  { type: 'info'
  , title: 'Information'
  , message: 'Something undexpected happened.'
  , help: null
  }

@Component
class Toastmaster extends Vue {
  toast (options, type, title, help) {
    let toast = Object.assign({}, toast_template)

    if (typeof options !== 'object') {
      toast.message = options || toast.message
      toast.type = type || toast.info
      toast.title = title || toast.title
      toast.help = help || toast.help
    } else {
      toast = Object.assign(toast, options)
    }
    
    this.$emit('toast', toast)
  }
}

const toastmaster = new Toastmaster()
export default toastmaster
