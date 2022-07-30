<template>
    <div v-if="joke" class="joke">
        <h1 id="joke-heading" class="purple">Joke</h1>
        <h3 id="joke-content-heading">
            {{ joke }}
        </h3>
        <div>
            <a class="purple" href="#" @click="fetchRandomJoke">refresh</a>
        </div>
    </div>
</template>

<script>
import {getRandomJoke} from "@/api/JokeApi"
export default {
    name: "RandomJoke",
    data() {
        return {
            joke: null
        }
    },
    mounted() {
        this.fetchRandomJoke()
    },
    methods: {
        async fetchRandomJoke(){
            const res = await getRandomJoke()
            this.joke = res.joke
        }
    }
}
</script>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.joke h1,
.joke h3 {
    text-align: center;
}
.joke div {
    text-align: center;
}

@media (min-width: 1024px) {
    .joke h1,
    .joke h3 {
        text-align: left;
    }
    .joke div {
        text-align: right;
    }
}
</style>