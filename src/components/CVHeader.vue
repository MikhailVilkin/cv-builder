<template>
    <div class="CVHeader" :style="{ '--gap': gap }">
        <div class="header-item left" :style="{ backgroundColor: color }">
          <div v-if="image" >
            <img :src="image" class="image">
          </div>
          <div v-else>
            <label for="fileInput">
              <img class="image" id="template" src="https://via.placeholder.com/200" alt="Profile Picture">
            </label>            
            <input type="file" id="fileInput" @change="handleFileSelect" style="display: none;" multiple>
          </div>
        </div>
        <div class="header-item right" :style="{ backgroundColor: color }">
            <h1>{{ name }} </h1>
            <h4 v-if="role != ''"> {{ role }} </h4>
            <br>
            <ul>
                <li v-if="phone != ''"><span v-if="show_prefixes">phone: </span>{{ phone }} </li>
                <li v-if="mail != ''"><span v-if="show_prefixes">e-mail: </span>{{ mail }} </li>
                <li v-if="location != ''"><span v-if="show_prefixes">location: </span>{{ location }} </li>
            </ul>
        </div>
    </div>
  </template>
  
  <script>
  
  
  export default {
    name: 'CVHeader',
    data() {
        return {
          image: null
        }
    },
    computed: {
      color() { return this.$store.state.secondColor},
      name() { return this.$store.state.name},
      role() { return  this.$store.state.role},
      phone() { return  this.$store.state.phone}, 
      mail() { return  this.$store.state.email},
      location() { return  this.$store.state.location},
      show_prefixes() { return this.$store.state.show_prefixes; },
      gap() { return this.$store.state.gap; }
    },
    methods: {
      handleFileSelect(event) {
        var input = event.target;
        if (input.files) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.image = e.target.result;
          }
          reader.readAsDataURL(input.files[0]);
        }
      }
    }
  }
  </script>
  
  <style scoped>

.CVHeader {
    display: flex;
    gap: var(--gap);
}

  .header-item {

    width: 100%;
    height: 200px;
    
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    padding: 5%;

  }

  .header-item.left {
    width: 200px;
    padding: 0;
    flex-shrink: 0;
  }

  .header-item.right {
    display: flex;
    flex-direction: column;

    justify-content: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  h3 {

  }

    .image {
        margin: 0;
        width: 100%; /* Set image width to 35vw */
        height: 100%;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

  
  </style>
  