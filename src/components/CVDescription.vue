<template>
    <div class="CVDescription" v-if="text != ''" :style="{ backgroundColor: color }">
      <p>{{ text }}</p>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'CVDescription',
    components: {
    },
    data() {
      return {
        
      }
    },
    computed: {
      text() { return this.$store.state.description; },
      color() { return this.$store.state.secondColor; }
    }
  }
  </script>
  
  <style scoped>
  .CVDescription {
    padding: 3% 10%;
    
    
    width: 100%;
    height: auto;

    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    text-align: center;
  }
  
  </style>