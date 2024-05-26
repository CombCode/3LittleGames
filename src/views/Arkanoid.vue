<template>
    <div class="flex flex-col h-auto">
        <div>
            <h2 class=" text-2xl font-bold">Arkanoid</h2>
        </div>
        <div id="game">
            <p class="font-mono font-extralight text-gray-400 my-20">Under development...</p>
        </div>
        <button @click="goHome" class="p-2 my-2 mx-20 rounded bg-zinc-700 hover:bg-zinc-500 active:bg-zinc-500">Home</button>
    </div>
</template>
<script>
import { defineEmits } from 'vue';

export default {
    setup(props, {emit}){

        let goHome = () => {
            emit("closeGame", "")
        }

        return {goHome}
    }
}
</script>