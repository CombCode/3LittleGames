<template>
    <div class="flex flex-col h-auto">
       <div>
            <h2 class=" text-2xl font-bold">Tic-tac-toe</h2>
        </div>
        <div id="game" class="flex-grow my-20 grid grid-cols-3 grid-rows-3 mx-10 aspect-square min-[600px]:w-96 min-[600px]:mx-auto">
            <div v-for="(cell, i) in cells" :key="i">
                <div class=" size-full border-solid border-2 border-white flex justify-center items-center hover:bg-zinc-500"
                    @click="makeMove(i)">
                    <div v-if="cell == 1" id="cerchio" class=" border-8 border-pink-300 h-2/3 w-2/3 rounded-full"></div>
                    <div v-if="cell == 2" id="croce" class="grid grid-cols-2 grid-rows-2 w-full h-full p-5">
                        <div class=" border-b-4 border-r-4 border-r-green-400 border-b-green-400"></div>
                        <div class=" border-l-4 border-b-4 border-l-green-400 border-b-green-400"></div>
                        <div class=" border-t-4 border-r-4 border-r-green-400 border-t-green-400"></div>
                        <div class=" border-t-4 border-l-4 border-t-green-400 border-l-green-400"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showResults">
            <p>{{results}}</p>
            <button @click="rePlay" @keypress:enter="rePlay" class="p-2 my-2 mx-20 rounded bg-zinc-700 hover:bg-zinc-500 active:bg-zinc-500">Play Again</button>
        </div>
        <div>
            <button @click="goHome" class="p-2 my-2 mx-20 rounded bg-zinc-700 hover:bg-zinc-500 active:bg-zinc-500">Home</button>
        </div> 
    </div>
    
</template>
<script>
import { ref } from 'vue';
import { defineEmits } from 'vue';

export default {
    setup(props, {emit}) {

        let goHome = () => {
            emit("closeGame", "")
        }

        let cells = ref(["", "", "", "", "", "", "", "", ""])
        let currentPlayer = ref("1")
        let makeMove = (i) => {
            console.log(i)
            if(showResults.value){
                //the game is already over
            }
            else{
                if(cells.value[i] != ""){
                    //not aviable cell
                }
                else{
                    cells.value[i] = currentPlayer.value
                    currentPlayer.value = currentPlayer.value === "1" ? "2" : "1"
                }
                checkWin()
                checkTie()
            }
        }
        let checkWin = () => {
            let cellsInt = []
            for(let i=0; i<9; i++){
                cellsInt[i] = parseInt(cells.value[i])
            }
            // player ONE wins
            if(
                //rows
                (cellsInt[0]+cellsInt[1]+cellsInt[2]) == 3 ||
                (cellsInt[3]+cellsInt[4]+cellsInt[5]) == 3 ||
                (cellsInt[6]+cellsInt[7]+cellsInt[8]) == 3 ||
                //cols
                (cellsInt[0]+cellsInt[3]+cellsInt[6]) == 3 ||
                (cellsInt[1]+cellsInt[4]+cellsInt[7]) == 3 ||
                (cellsInt[2]+cellsInt[5]+cellsInt[8]) == 3 ||
                //diagonals
                (cellsInt[0]+cellsInt[4]+cellsInt[8]) == 3 ||
                (cellsInt[2]+cellsInt[4]+cellsInt[6]) == 3
            ){
                console.log("player 1 wins!")
                endGame(1)
            }
            // player TWO wins
            else if(
                //rows
                (cellsInt[0]+cellsInt[1]+cellsInt[2]) == 6 ||
                (cellsInt[3]+cellsInt[4]+cellsInt[5]) == 6 ||
                (cellsInt[6]+cellsInt[7]+cellsInt[8]) == 6 ||
                //cols
                (cellsInt[0]+cellsInt[3]+cellsInt[6]) == 6 ||
                (cellsInt[1]+cellsInt[4]+cellsInt[7]) == 6 ||
                (cellsInt[2]+cellsInt[5]+cellsInt[8]) == 6 ||
                //diagonals
                (cellsInt[0]+cellsInt[4]+cellsInt[8]) == 6 ||
                (cellsInt[2]+cellsInt[4]+cellsInt[6]) == 6
            ){
                console.log("player 2 wins!")
                endGame(2)
            }
        }
        let checkTie = () => {
            let checkSum = 0
            cells.value.forEach(element => {
                if(element != "")
                    checkSum ++
                if(checkSum == cells.value.length)
                    endGame()
            });
        }
        let results = ref("")
        let showResults = ref(false)
        let endGame = (winnerPlayerNumber) => {
            if(winnerPlayerNumber == 1){
                results.value = "End of the game! \n Player 1 wins!"
            }
            else if (winnerPlayerNumber == 2){
                results.value = "End of the game! \n Player 2 wins!"
            }
            else if (winnerPlayerNumber == null){
                results.value = "End of the game! \n It's a tie!"
            }
            showResults.value = true
        }

        let rePlay= () => {
            currentPlayer.value = "1"
            cells.value = ["", "", "", "", "", "", "", "", ""]
            results.value = ""
            showResults.value = false
        }

    return{goHome, cells, makeMove, results, showResults, rePlay}
    }
}
</script>