import Router from 'vue-router'
import logger from 'loglevel'

function configure (Vue) {
  Vue.use(Router)
  let router = new Router()

  const components = getComponents()
  components.forEach(component => Vue.component(component.name, component))
  
  let routes = getRoutes(components)
  router.addRoutes(routes)

  router.beforeEach((to, from, next) => {
    // TODO: implement some sort of security check
    return next()
  })
  
  router.options = router.options || {}
  router.options.routes = routes
  return router
}

function getComponents () {
  const components = []
  const files = (require.context('@/', true, /\.vue$/))

  files.keys().forEach(path => {
    const component = files(path).default
    if (!component.name) throw Error('All pages and components must specify a name: ' + component.__file)
    components.push(component)
    // logger.info('ADDED COMPONENT', component)
  })
  
  return components
}

function getRoutes (components) {
  // Sort the componets in order so that we get parents before children
  components.sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
  })

  // Add routes by convention ...
  let routes = components.reduce((routes, component) => {
    // Default the path to the most common usage.
    let path = '/' + component.name
    let restricted = component.restricted || false
    
    let props = Object.keys(component.props || {}).reduce((props, key) => {
      props = props || ''
      props += `/:${key}?`
      return props
    }, null)
    
    if (component.name.indexOf('.') > -1) {
      // Add any children to parent paths
      
      // Here we are declaring the full path for the child 
      // even though vue will take just the name (though either will work).
      // This way, we can look up grandchildren more easily by path.
      let parent = findParent(component, routes)
      let name = component.name.replace(parent.name, parent.path)
      let path = name.split('.').join('/') + (props || '')

      
      // Add this component to the parent route
      parent.children = parent.children || []
      parent.children.push({ path, component, props: props != null, name: component.name, meta: { restricted }  })
      return routes

    } else if (component.__file && component.__file.indexOf('components') > -1) {
      // Add the component path to the routing so we can explore components easily.
      // Only components should have a "-" in their name according to our convention.
      // So we're making a direct route to the specic component for individual testing.
      // WARNING: Because __file does not exist in a production deployment, this path will not exist
      path = '/components' + path
    }
    
    path += props || ''

    // If the vue is not a component or a child, its a parent view
    // So we add it as a default path and top most page.
    routes.push({ path, component, props: props != null, name: component.name, meta: { restricted }  })
    return routes
  }, [])

  
  // Manually add important/core routes for the application.
  // We don't add these by convention so that they don't change on accident.
  routes.push({ path: '/', name: 'root', redirect: '/home' })
  routes.push({ path: '*', name: 'any', component: () => import('@/views/NotFound.vue') })
  
  // Add our routes to the router for use by our application.
  logger.info('ROUTES', routes)
  
  return routes
}

function findParent (child, routes) {
  let nameParts = child.name.split('.')
  let parentName = nameParts.slice(0, -1).join('.')
  let parent = routes.reduce((parent, route) => {
    if (parent) return parent
    
    if (route.name === parentName) {
      parent = route
      return parent
    }
    
    if (!route.children) return parent
    
    parent = findParent(child, route.children)
    return parent
  }, null)

  return parent
}

export default { configure }