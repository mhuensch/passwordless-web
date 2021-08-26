<template lang="pug">
  div.colors
    div.color-grid
      div.color-item.primary primary
      div.color-item.primary-subtle primary-subtle
      div.color-item.primary-x-subtle primary-x-subtle
      div.color-item.interactive interactive
      div.color-item.interactive-subtle interactive-subtle
      div.color-item.interactive-x-subtle interactive-x-subtle
      div.color-item.good good
      div.color-item.warn warn
      div.color-item.bad bad
</template>

<script>
  function data () {
    let model = 
      {
      }
    return model
  }

  let module =
    { name: 'colors'
    , data
    }

  export default module
</script>

<style lang="postcss" scoped>
  .colors {
    position: absolute;
    width: 100%;
  }
  
  .color-grid {
    display: grid;
    grid-template-columns: 15em 15em 15em;
    grid-template-rows: 15em 15em 15em;
    margin: 0 auto;
    position: relative; 
    width: 45em;
  }
  
  .color-item {
    display: inline-grid;
    text-align: center;
    border: 1px solid var(--color-foreground);
    border-radius: 1em;
    margin: 1em;
    color: var(--color-background);
  }
  
  .primary {
    background-color: var(--color-primary);
  }
  
  .primary-subtle {
    background-color: var(--color-primary-subtle);
  }
  
  .primary-x-subtle {
    background-color: var(--color-primary-x-subtle);
  }
  
  .interactive {
    background-color: var(--color-interactive);
  }
  
  .interactive-subtle {
    background-color: var(--color-interactive-subtle);
  }
  
  .interactive-x-subtle {
    background-color: var(--color-interactive-x-subtle);
  }
  
  .good {
    background-color: var(--color-good);
  }
  
  .warn {
    background-color: var(--color-warn);
  }
  
  .bad {
    background-color: var(--color-bad);
  }
  
</style>
