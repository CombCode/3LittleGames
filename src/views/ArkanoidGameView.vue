<template>
    <div>
        <div>
            <P5 :sketch="sketch" class=" border-white border-2 border-solid"/>
        </div>
        <div class="flex flex-col justify-center my-10" v-if="device === 'mobile'">
            <div class="flex flex-row justify-center content-center">
                <div class="w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid my-1 mx-5 content-center text-3xl active:bg-zinc-500" 
                    @touchstart="moveByButton('left')" 
                    @touchend="stopTouchHold" 
                    @touchcancel="stopTouchHold">
                    ←</div>
                <div class="w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid my-1 mx-5 content-center text-3xl active:bg-zinc-500" 
                @touchstart="moveByButton('right')" 
                @touchend="stopTouchHold" 
                @touchcancel="stopTouchHold">
                →</div>
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
        
        //device check for responsive design
        let device = props.device
        console.log("props.device = ", device)

        let setCanvaSize = () => {
            if(device === "mobile")
                return 300
            else
                return 600
        } 

        //outside game service data
        let gameEnded = ref(false)
        let score = ref(0)

        //reactive canva size
        let canvaSize = setCanvaSize()
        console.log("canva size: ", canvaSize)

        //to reach sketch's function outside (arrow mobile buttons)
        let p5Instance = null;

        const sketch = (p5) => {

            //world
            let unitSize
            let gameSpeed

            //game actors
                //player
                let playerXSize = canvaSize/5
                let playerXPos = canvaSize/2-playerXSize/2 //left corners 
            

            p5.setup = () => {

                //canva 
                console.log("canva p5 started")
                p5.createCanvas(canvaSize, canvaSize)

                //world
                const cellsNumberInRow = 20
                unitSize = p5.width/cellsNumberInRow  //unit w = h = 15px     // 20 units
                gameSpeed = 5

            }  
            p5.draw = () => {
                p5.background(30)

                //move player (data)
                triggerMove()
                //move ball (data)  -bounce function with vetor

                //check brick broken (add point)


                //draw
                    //bricks

                    //player
                    p5.rect(playerXPos, canvaSize-unitSize, playerXSize, unitSize)    //rect(x, y, w, h,)
                    //ball

                
               
            }

            //--------------------

            function triggerMove(direction) {

                //KEYBOARD
                //right
                if (p5.keyCode === 39 && p5.keyIsPressed){
                    if(playerXPos >= canvaSize-playerXSize){
                        //stop
                    }
                    else{
                        playerXPos += gameSpeed  
                    }
                    
                }
                //left
                else if (p5.keyCode === 37 && p5.keyIsPressed){
                    if(playerXPos <= 0){
                        //stop
                    }
                    else{
                        playerXPos -= gameSpeed  
                    } 
                }
                
                //MOBILE BUTTONS
                if(direction == "right"){
                    if(playerXPos >= canvaSize-playerXSize){
                        //stop
                    }
                    else{
                        playerXPos += gameSpeed  
                    }
                }
                else if(direction == "left"){
                    if(playerXPos <= 0){
                        //stop
                    }
                    else{
                        playerXPos -= gameSpeed  
                    }
                }

            }
            
            //game end
            const endGame = (result) => {
                console.log("game end,  result: ", result)
                emit("gameEnded", score.value)
            }
            
            p5Instance = { triggerMove };
            
        }//--end of p5 sketch--


        //Mobile buttons handling
        const touchHoldIntervalID = ref(null);

        const moveByButton = (direction) => {
                console.log("button pressed")
                p5Instance.triggerMove(direction)
                touchHoldIntervalID.value = setInterval(() => {
                    p5Instance.triggerMove(direction)
                }, 1);
        }
        const stopTouchHold = () => {
            clearInterval(touchHoldIntervalID.value)
            touchHoldIntervalID.value = null
        }


        
        return{sketch, moveByButton, stopTouchHold, device, score}
    }
}
</script>