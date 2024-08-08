<template>
    <div>
        <div>
            <P5 :sketch="sketch" class=" border-white border-2 border-solid"/>
        </div>
        <div class="flex flex-col justify-center my-10" v-if="device === 'mobile'">
            <div class="flex flex-row justify-center content-center">
                <div class=" unselectable w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid m-1 content-center text-3xl active:bg-zinc-500" @click="updateSnakePosByButton('up')">↑</div>
            </div>
          
            <div class="flex flex-row justify-center content-center">
                <div class="unselectable w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid my-1 mx-5 content-center text-3xl active:bg-zinc-500" @click="updateSnakePosByButton('left')">←</div>
                <div class="unselectable w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid my-1 mx-5 content-center text-3xl active:bg-zinc-500" @click="updateSnakePosByButton('right')">→</div>
            </div>
            <div class="flex flex-row justify-center content-center">
                <div class="unselectable w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid m-1 content-center text-3xl active:bg-zinc-500" @click="updateSnakePosByButton('down')">↓</div>
            </div>
        </div> 
        <div v-if="device === 'pc' && score ==  0" class="font-mono">Move using the keyboard arrow keys</div>
    </div>
</template>


<script>
import p5 from "p5"
import { ref } from "vue";
import { defineEmits } from 'vue';

export default {

    props: ["device"],
    
    setup(props, { emit }) {
        

        let device = props.device
        console.log("props.device = ", device)

        let gameEnded = ref(false)
        let score = ref(0)
        let actualDirection = ref("none")

        let setCanvaSize = () => {
            if(device === "mobile")
                return 300
            else
                return 500
        } 

        let canvaSize = setCanvaSize()
        console.log("canva size: ", canvaSize)

        const sketch = (p5) => {
            let startingX
            let startingY
            let unitSize
            let cherryPos
            let snakeArray
            let fps
            let currentFrame
            

            p5.setup = () => {
                console.log("canva p5 started")
                let canvaL = canvaSize
                p5.createCanvas(canvaL, canvaL)

                //world
                const cellsNumberInRow = 20
                unitSize = p5.width/cellsNumberInRow  //unit w = h = 15px     // 20 units
                fps = 5; currentFrame = 0
                
                //player
                startingX = p5.width/2
                startingY = p5.height/2
                let firstSnakePos = {x: startingX, y: startingY}
                snakeArray = [firstSnakePos]

                //cherry (first)
                cherryPos = pickRandomGridPos()    //return {x: xval, y: yval}
                console.log("cherry pos", cherryPos)

            }  
            p5.draw = () => {
                p5.background(30)

                //snake draw
                snakeArray.forEach((element) => {
                    p5.square(element.x, element.y, unitSize)
                })

                //cherry draw 
                p5.circle(cherryPos.x+unitSize/2, cherryPos.y+unitSize/2, unitSize)


                //snake moves (only data values update)
                if(currentFrame === fps){

                    // if snake eat
                    if(snakeArray[0].x === cherryPos.x && snakeArray[0].y === cherryPos.y){
                        
                        snakeArray.push({x: cherryPos.x, y: cherryPos.y})
                        score.value++
                        console.log(score.value)

                        //cherry pos update
                        cherryPos = pickRandomGridPos()    //return {x: xval, y: yval}
                        console.log("new cherry pos", cherryPos)
                        
                    }
                    
                    //update position (only data)
                    if(!gameEnded.value){
                        keyPressed()
                        updateSnakePos(actualDirection.value)
                    }

                    //check lost
                    if(checkLost()){
                        endGame("lost")
                    }

                    //check win
                    /* if(snakeArray.length == (cellsNumberInRow*cellsNumberInRow)){
                        endGame("win")
                    } */

                    currentFrame = 0
                    edgePacmanEffect()

                }
                else{
                    currentFrame++
                }
            }

            function keyPressed() {
                //up
                if (p5.keyCode === 38){
                    actualDirection.value = "up"
                }
                //down
                else if (p5.keyCode === 40){
                    actualDirection.value = "down"
                }
                //right
                else if (p5.keyCode === 39){
                    actualDirection.value = "right"
                }
                //left
                else if (p5.keyCode === 37){
                    actualDirection.value = "left"
                }
                
            }
            function edgePacmanEffect() {
                //up
                if (snakeArray[0].y < 0){
                    snakeArray[0].y = p5.height - unitSize 
                }
                //down
                else if (snakeArray[0].y >= p5.height){
                    snakeArray[0].y = unitSize 
                }
                //right
                else if (snakeArray[0].x >= p5.width){
                    snakeArray[0].x = unitSize 
                }
                //left
                else if (snakeArray[0].x < 0){
                    snakeArray[0].x = p5.width - unitSize 
                }
                
            }

            const updateSnakePos = (direction) => {

                //save head position
                const head = snakeArray[0]
                
                //snake tail update
                if(snakeArray.length >= 2){ 
                    for(let i = (snakeArray.length-1); i > 0; i--){

                        let dummy =  {x:  snakeArray[i-1].x, y: snakeArray[i-1].y}

                        snakeArray[i].x = dummy.x
                        snakeArray[i].y = dummy.y

                    } 
                }

                //head moves
                //up
                if (direction == "up"){
                    snakeArray[0].y = head.y - 1*unitSize
                }
                //down
                else if (direction == "down"){
                    snakeArray[0].y = head.y + 1*unitSize
                }
                //right
                else if (direction == "right"){
                    snakeArray[0].x = head.x + 1*unitSize
                }
                //left
                else if (direction == "left"){
                    snakeArray[0].x = head.x - 1*unitSize
                }
                
            }

            const pickRandomGridPos = () => {
                const x = Math.floor(Math.random() * (p5.width/unitSize))
                const y = Math.floor(Math.random() * (p5.height/unitSize))
                return {x: x*unitSize, y: y*unitSize}
            }


            const checkLost = () => {
                const head = snakeArray[0]
                let lost = false
                for(let i = 1; i<snakeArray.length && lost == false; i++){
                    if(head.x == snakeArray[i].x && head.y == snakeArray[i].y){
                        lost = true
                    }
                }
                return lost
            }

            const endGame = (result) => {
                console.log("game end,  result: ", result)
                emit("gameEnded", score.value)
            }
            
            
        }

        const updateSnakePosByButton = (direction) => {
            console.log("button pressed")
            actualDirection.value = direction
        }
        return{sketch, updateSnakePosByButton, device, score}
    }
}
</script>