<template>
    <div class="CVListEditor">
      <label>{{ name }}</label><br>
      <input type="text" v-model="input_first">&nbsp;
      <button @click="addData">add</button><br>
      <input v-if="!big" type="text" v-model="input_second">
      <textarea v-else v-model="input_second"  rows="5"></textarea>&nbsp;
      <div v-for="v,k in values" :key="k">
        <button @click="deleteData(k)" class="list-remover">x</button> 
        {{ k }}<span v-if="v != ''">. {{ v }}</span>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'CVListEditor',
    props: {
        name: String,
        commit_method: String,
        values: Object,
        big: {
            type: Boolean,
            default: false
        },
    },
    data() {
      return {
        input_first: '',
        input_second: '',
      }
    },
    methods: {
        addData() { 
            this.$emit('addData', this.commit_method, this.input_first, this.input_second); 
            this.input_first = "";
            this.input_second = "";
        },
        deleteData(key) {
            this.$emit('removeData', this.commit_method, key, null)
        }
    }
  }
  </script>
  
  <style scoped>
  .CVListEditor {

  }

  textarea {
  width: 100%;
  height: auto;
  resize: none;
  overflow: hidden;
  overflow-y: scroll;
}

.list-remover {
    background-color: #ff6347; /* Red */
    color: white;
    border: none;
    padding: 3px 6px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 11px;
    text-align: center;
}
  
.list-remover:hover {
  background-color: #cc4125; /* Darker red */
}

  </style>