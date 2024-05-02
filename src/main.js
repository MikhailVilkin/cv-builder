import { createApp } from 'vue';
import { createStore } from 'vuex';
import Vue3SimpleHtml2pdf from "vue3-simple-html2pdf";
import App from './App.vue';


const store = createStore({
    state() {
        return {
            bgColor: "#3c377c",
            secondColor: "#F0F8FF",
            gap: '10px',

            name: "Your Name",
            role: "your role",
            phone: "123213213",
            email: "aaaabbbb@cccc.eee",
            location: "New York, USA",
            show_prefixes: true,

            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

            experience: {},
            technical_skills: {},
            languages: {"English":""},
            soft_skills: {},

        }
    },
    mutations: {
        updateBGColor (state, payload) { state.bgColor = payload; },
        updateSecondColor (state, payload) { state.secondColor = payload; },
        updateGap (state, payload) { state.gap = payload; },
        updateName (state, payload) { state.name = payload; },
        updateRole (state, payload) { state.role = payload; },
        updatePhone (state, payload) { state.phone = payload; },
        updateEmail (state, payload) { state.email = payload; },
        updateLocation (state, payload) { state.location = payload; },
        updateShowPrefixex(state, payload) { state.show_prefixes = payload; },
        updateDescription(state, payload) { state.description = payload; },
        updateLanguages(state, payload) { 
            const { key, value } = payload;
            if (Object.prototype.hasOwnProperty.call(state.languages, key) && value == null) {
                delete state.languages[key]
            } else {
                state.languages[key] = value;
            }
        },
        updateExperience(state, payload) { 
            const { key, value } = payload;
            if (Object.prototype.hasOwnProperty.call(state.experience, key) && value == null) {
                delete state.experience[key]
            } else {
                state.experience[key] = value;
            }
        },
        updateTechnicalSkills(state, payload) { 
            const { key, value } = payload;
            if (Object.prototype.hasOwnProperty.call(state.technical_skills, key) && value == null) {
                delete state.technical_skills[key]
            } else {
                state.technical_skills[key] = value;
            }
        },
        updateSoftSkills(state, payload) { 
            const { key, value } = payload;
            if (Object.prototype.hasOwnProperty.call(state.soft_skills, key) && value == null) {
                delete state.soft_skills[key]
            } else {
                state.soft_skills[key] = value;
            }
        },
    }
});


const app = createApp(App);

app.use(store);

app.use(Vue3SimpleHtml2pdf);

app.mount('#app');