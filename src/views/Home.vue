<template lang="pug">
  div.content
    div.sub-title
      router-link(to="/demo") Watch It Work!
    
    p This project is designed to be a pre-configured "kickstart" for web applications
     | using my favorite technologies, working together, the way I like.
     | At the time of writing, these technologies include:
     
    ul
      li Front End: Vuejs
      li Back End: Node/Express/Socket.io
      li Database: Node.js Embedded Database (NeDB)
      li Authentication: Auth0
      li Architecture: entities loaded by convention

    p Using each of these technologies independantly is pretty straight forward. 
      | Getting them to play together while following maintainable and repeatable conventions,
      | is a bit of a task each time you want to start a new project.  I found I was often cloning
      | existing projects, removing un-related logic, and working from that point forward. 
      
    p This solution includes three seperate repositories that should be coppied into 
     | the same parent folder and modified.  These three projects are:
     
    ul
      li Front End: Kickstart Web
      li Back End: Kickstart API
      li Domain: Kickstart Domain
      
    p This project does NOT include any styling, css framework, etc. as it is intended to be 
     | agnostic from from the consuming project and styling should be very use-case specific.
     | However, it does include some of the bare minimum styling elements I always find helpfull.
     | These elements include:
     
    ul
      li A reset CSS file
      li Fontawesome (dynamically loaded)
      li Media Queries
      li Color css variables
      li Link styled button
      li Button styled link
      
    div.sub-title
      router-link(to="/demo") Watch It Work!
</template>

<script>
  let module =
    { name: 'home'
    }

  export default module
</script>

<style scoped>
  .sub-title {
    text-align: center;
    margin-bottom: 1em;
  }
  
  .content {
    max-width: 800px;
    margin: auto;
  }
</style>