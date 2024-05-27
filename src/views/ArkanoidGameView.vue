<template>
    <div>
        <div>
            <P5 :sketch="sketch" class=" border-white border-2 border-solid"/>
        </div>
        <div class="flex flex-col justify-center my-10" v-if="device === 'mobile'">
            <div class="flex flex-row justify-center content-center">
                <div class="w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid my-1 mx-5 content-center text-3xl active:bg-zinc-500" @click="moveByButton('left')">←</div>
                <div class="w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid my-1 mx-5 content-center text-3xl active:bg-zinc-500" @click="moveByButton('right')">→</div>
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

        let canvaSize = setCanvaSize()
        console.log("canva size: ", canvaSize)

        const sketch = (p5) => {

            //world
            let unitSize
            /* let fps
            let currentFrame */

            //game
            

            p5.setup = () => {

                //canva 
                console.log("canva p5 started")
                let canvaL = canvaSize
                p5.createCanvas(canvaL, canvaL)

                //world units
                const cellsNumberInRow = 20
                unitSize = p5.width/cellsNumberInRow  //unit w = h = 15px     // 20 units
                /* fps = 5; currentFrame = 0 */

            }  
            p5.draw = () => {
                p5.background(30)

                //move player (data)

                //move ball (data)  -bounce function with vetor

                //check brick broken (add point)


                //draw
                    //bricks

                    //player

                    //ball

                
               
            }

            //--------------------

            function triggerMove() {
                //right
                if (p5.keyCode === 39){
                    actualDirection.value = "right"
                }
                //left
                else if (p5.keyCode === 37){
                    actualDirection.value = "left"
                }
                
            }
            
            //game end
            const endGame = (result) => {
                console.log("game end,  result: ", result)
                emit("gameEnded", score.value)
            }
            
            
        }//end sketch

        const moveByButton = (direction) => {
                        console.log("button pressed")
            }


        
        return{sketch, moveByButton, device, score}
    }
}
</script>