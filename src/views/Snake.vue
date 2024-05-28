<template>
    <div class="flex flex-col h-auto">
        <div>
            <h2 class=" text-2xl font-bold">Snake</h2>
        </div>
        <div id="game" class="flex flex-row justify-center">
            <SnakeGameView v-if="!gameEndedToggle" @gameEnded="handle_gameEnded" :device="getDevice()"></SnakeGameView>
            <div id="gameScreenPlaceholder" v-if="gameEndedToggle" class="w-72 h-72 border-white border-2 border-solid bg-zinc-900 min-[1400px]:w-[400px] min-[1400px]:h-[400px]"></div>
        </div>
        <div v-if="gameEndedToggle" class="flex flex-col justify-center">
            <p>Score: {{score}}</p>
            <button @click="gameEndedToggle = false" class="p-2 my-2 mx-20 rounded bg-zinc-700 hover:bg-zinc-500 active:bg-zinc-500">Play Again</button>
            <button @click="goHome" class="p-2 my-2 mx-20 rounded bg-zinc-700 hover:bg-zinc-500 active:bg-zinc-500">Home</button>
        </div>
    </div>
</template>
<script>
import p5 from "p5"
import { ref } from "vue";
import SnakeGameView from "./SnakeGameView.vue"
import { defineEmits } from 'vue';

export default {

    components: {SnakeGameView},
    props: ["device"],

    setup(props, { emit }) {

        let gameEndedToggle = ref(false)
        let score = ref(0)

        let handle_gameEnded = (s) => {
            gameEndedToggle.value = true
            score.value = s
        }

        let getDevice = () => {
            return props.device
        }

        let goHome = () => {
            emit("closeGame", "")
        }

        return{gameEndedToggle, handle_gameEnded, score, getDevice, goHome}
    }
}
</script>