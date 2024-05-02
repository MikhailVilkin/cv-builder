<template>
  <div class="CVMaker">

    <button @click="generatePDF">Generate PDF</button>

    <br><br><br><br>

    <input type="color" v-model="bgColor">
    <input type="color" v-model="secondColor">

    <br><br>

    <input type="range" id="gap" name="gap" min="5" max="30" v-model="gap_no_units">

    <br><br><br>

    <label for="NAME" >NAME: </label>
    <input type="text" v-model="name" id="NAME">
    <br><br>
    <label for="ROLE" >ROLE: </label>
    <input type="text" v-model="role" id="ROLE">
    <br><br><br>
    <input type="checkbox" v-model="show_prefixes" id="show_prefixes"/>
    <label for="show_prefixes" style="user-select: none;"> Show prefixes</label>
    <br><br>
    <label for="PHONE" >PHONE: </label>
    <input type="text" v-model="phone" id="PHONE">
    <br><br>
    <label for="EMAIL" >EMAIL: </label>
    <input type="text" v-model="email" id="EMAIL">
    <br><br>
    <label for="LOCATION" >LOCATION: </label>
    <input type="text" v-model="location" id="LOCATION">
    <br><br><br>
    <label for="description" >ABOUT ME: </label><br>
    <textarea id="description" v-model="description" rows="10"></textarea>

    <br><br><br>

    <CVListEditor name="EXPERIENCE:" 
                  :values="experience" 
                  :big="true"
                  commit_method="updateExperience" 
                  @addData="updateData" 
                  @removeData="updateData"/>
    <br><br>
    <CVListEditor name="TECHNICAL SKILLS:" 
                  :values="technical_skills" 
                  commit_method="updateTechnicalSkills" 
                  @addData="updateData" 
                  @removeData="updateData"/>
    <br><br>
    <CVListEditor name="SOFT SKILLS:" 
                  :values="soft_skills" 
                  commit_method="updateSoftSkills" 
                  @addData="updateData" 
                  @removeData="updateData"/>
    <br><br>
    <CVListEditor name="LANGUAGES:" 
                  :values="languages" 
                  commit_method="updateLanguages" 
                  @addData="updateData" 
                  @removeData="updateData"/>
    <br><br><br>

  </div>
</template>


<script>

import CVListEditor from './CVListEditor.vue' 

export default {
  name: 'CVMaker',
  components: {
    CVListEditor
  },
  data() {
    return {
    }
  },
  methods: {
      updateData(id, key, value) { this.$store.commit(id, {key, value}); },
      generatePDF() {
        this.$emit('generatePDF');
      }
  },
  computed: {
      bgColor: {
        get: function() { return this.$store.state.bgColor; },
        set: function(val) { this.$store.commit('updateBGColor', val); }
      },

      secondColor: {
        get: function() { return this.$store.state.secondColor; },
        set: function(val) { this.$store.commit('updateSecondColor', val); }
      },

      gap: {
        get: function() { return this.$store.state['gap']; },
        set: function(val) { this.$store.commit('updateGap', val); }
      },

      gap_no_units: {
        get: function() { return parseInt(this.gap.substring(0, this.gap.length - 2)); },
        set: function(val) { this.gap = val + 'px' }
      },

      name: { 
        get: function() { return this.$store.state.name; },
        set: function(val) { this.$store.commit('updateName', val); }
      },
      role: {
        get: function() { return this.$store.state.role; },
        set: function(val) { this.$store.commit('updateRole', val); }
      },
      phone: {
        get: function() { return this.$store.state.phone; },
        set: function(val) { this.$store.commit('updatePhone', val); }
      },
      email: {
        get: function() { return this.$store.state.email; },
        set: function(val) { this.$store.commit('updateEmail', val); }
      },
      location: {
        get: function() { return this.$store.state.location; },
        set: function(val) { this.$store.commit('updateLocation', val); }
      },
      show_prefixes: { 
        get: function() { return this.$store.state.show_prefixes; },
        set: function(val) { this.$store.commit('updateShowPrefixex', val); }
      },
      description: {
        get: function() { return this.$store.state.description; },
        set: function(val) { this.$store.commit('updateDescription', val); }
      },
      
      languages() { return this.$store.state.languages; },
      experience() { return this.$store.state.experience; },
      technical_skills() { return this.$store.state.technical_skills; },
      soft_skills() { return this.$store.state.soft_skills; },
  }
}
</script>


<style scoped>

.CVMaker {
  border: 1px solid red;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

textarea {
  width: 100%;
  height: auto;
  resize: none;
  overflow: hidden;
  overflow-y: scroll;
}

</style>
