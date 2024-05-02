<template>
    <div class="CVBlock" :style="{ backgroundColor: color }">
        <h1>{{ title }}</h1>
        <ul>
            <li v-for="v,k in items" :key="k">
                <strong>{{ k }}</strong><span v-if="v != ''"><strong>.</strong> {{ v }}</span>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'CVBlock',
    components: {
    },
    props: {
        title: String,
        items: Object
    },
    data() {
        return { 
        
        }
    },
    computed: {
      color() { return this.$store.state.secondColor; }
    }
}
</script>

<style scoped>
.CVBlock {
    padding: 5%;

    width: 100%;
    height: auto;
    min-height: 100px;

    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);


}

h1 {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 20px;
}

ul {
    margin: 3%;
}

li {
    list-style: none;
    margin-bottom: 10px;
}

</style>