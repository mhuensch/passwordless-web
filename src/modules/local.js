class Local {
  set (key, value) {
    return localStorage.setItem(`kickstart_${key}`,JSON.stringify(value))
  }

  get (key) {
    try {
      return JSON.parse(localStorage.getItem(`kickstart_${key}`))
    } catch {
      return localStorage.getItem(`kickstart_${key}`)
    }
  }
}

const local = new Local()
export default local