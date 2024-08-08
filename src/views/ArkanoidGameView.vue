<template>
    <div>
        <div>
            <P5 :sketch="sketch" class=" border-white border-2 border-solid"/>
        </div>
        <div class="flex flex-col justify-center my-10" v-if="device === 'mobile'">
            <div class="flex flex-row justify-center content-center">
                <div class=" unselectable w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid my-1 mx-5 content-center text-3xl active:bg-zinc-500" 
                    @touchstart="moveByButton('left')" 
                    @touchend="stopTouchHold" 
                    @touchcancel="stopTouchHold">
                    ←</div>
                <div class=" unselectable w-1/4 rounded aspect-square bg-zinc-700 border-white border-2 border-solid my-1 mx-5 content-center text-3xl active:bg-zinc-500" 
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
                return 500
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
            let gameSpeed = 5
            let unitSizeY = canvaSize/20

            //game actors
                //player
                let playerXSize = canvaSize/5 //player root data
                let playerXPos = canvaSize/2-playerXSize/2 //left corners 
                //bricks
                let bricksInARow = 5 //bricks root data
                let bricksRows = 8  //bricks root data
                let bricksize = canvaSize/bricksInARow
                let bricks = []
                for(let j=0; j< bricksRows; j++){
                    for(let i=0; i< bricksInARow; i++){
                        let brickUpperLeftCornerPos_x = (canvaSize/bricksInARow) * i
                        let brickUpperLeftCornerPos_y = unitSizeY * j
                        let brickId = "" + j+ i
                        bricks.push({
                            x: brickUpperLeftCornerPos_x,
                            y: brickUpperLeftCornerPos_y,
                            id: brickId
                        })
                    }
                }
                console.log("bricks", bricks)
                //ball
                let ballDiameter = unitSizeY
                let ballX = canvaSize / 2
                let ballY = canvaSize - unitSizeY - ballDiameter/2 -1
                let ballSpeedX = gameSpeed * 0.8 //ball root data
                let ballSpeedY = gameSpeed * 0.8 //ball root data

            p5.setup = () => {

                //canva 
                console.log("canva p5 started")
                p5.createCanvas(canvaSize, canvaSize)

            }  
            p5.draw = () => {
                p5.background(30)

                //move player (data)
                triggerMove()

                //move ball (data)  
                ballX += ballSpeedX
                ballY += ballSpeedY

                //check brick broken (add point) and collisions
                checkBallCollision()

                //draw
                    //bricks
                    bricks.forEach((brick) => {
                        p5.rect(brick.x, brick.y, bricksize, unitSizeY) 
                    })
                    //player
                    p5.rect(playerXPos, canvaSize-unitSizeY, playerXSize, unitSizeY)    //rect(x, y, w, h,)
                    //ball
                    p5.circle(ballX, ballY, ballDiameter)
                
               
            }

            //--------------------

            const checkBallCollision = () => {

                //canva bounds
                if(ballX >= canvaSize-ballDiameter/2 || ballX <= 0+ballDiameter/2){
                    ballSpeedX = ballSpeedX * (-1)
                }
                if(ballY <= 0+ballDiameter/2){
                    ballSpeedY = ballSpeedY * (-1)
                }
                if(ballY >= canvaSize-ballDiameter/2){
                    endGame()
                }

                //player
                if(ballY >= canvaSize-unitSizeY-ballDiameter/2){    // ball at player Y
                    if(ballX >= playerXPos-ballDiameter/2 && ballX <= playerXPos+playerXSize+ballDiameter/2){   //at player X
                        ballSpeedY = ballSpeedY * (-1)
                    }
                    else{
                        endGame()
                    }
                }

                //bricks
                bricks.forEach((brick, index) => {
                    //side collision
                    if(ballY >= brick.y && ballY <= brick.y + unitSizeY){
                        if(ballX >= brick.x+ballDiameter/2 && ballX <= brick.x+bricksize+ballDiameter/2){
                            ballSpeedX = ballSpeedX * (-1)
                            bricks.splice(index, 1)
                            score.value++
                        }
                    }
                    //vertical collisions
                    if(ballX >= brick.x-ballDiameter/2 && ballX <= brick.x+bricksize+ballDiameter/2){
                        if(ballY >= brick.y-ballDiameter/2 && ballY <= brick.y+unitSizeY+ballDiameter/2){
                            ballSpeedY = ballSpeedY * (-1)
                            bricks.splice(index, 1)
                            score.value++
                        }
                    }
                })
            }
            const triggerMove = (direction) => {

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