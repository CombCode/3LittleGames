<template>
  <div>
  <div v-if="gameOpen==''">
    <div class="flex flex-col justify-center items-center h-full min-[1400px]:flex-row">
      <div class=" h-36 w-36 border-solid border-2 border-white rounded m-5
            hover:h-40 hover:w-40 transition-all ease-in-out duration-300
            min-[1400px]:h-80  min-[1400px]:w-80  min-[1400px]:hover:w-96 min-[1400px]:hover:h-96"
            @click="toggleGameOpen('Tictactoe')">
          <!-- <p>tictactoe</p> -->
        <div class=" p-2 grid grid-cols-3 grid-rows-3 w-full h-full">
          <div class=" border-2 border-white border-t-0 border-l-0"></div>
          <div class=" border-2 border-white border-t-0"></div>
          <div class=" border-2 border-white border-t-0 border-r-0"></div>
          <div class=" border-2 border-white border-l-0"></div>
          <div class=" border-2 border-white"></div>
          <div class=" border-2 border-white border-r-0 flex align-middle justify-center p-1">
              <div class="border-2 border-red-600 w-full h-full rounded-full"></div>
          </div>
          <div class=" border-2 border-white border-l-0 border-b-0">
            
            <div class="grid grid-cols-2 grid-rows-2 w-full h-full p-1">
              <div class=" border-b-2 border-r-2 border-r-white border-b-white"></div>
              <div class=" border-l-2 border-b-2 border-l-white border-b-white"></div>
              <div class=" border-t-2 border-r-2 border-r-white border-t-white"></div>
              <div class=" border-t-2 border-l-2 border-t-white border-l-white"></div>
          </div>

          </div>
          <div class=" border-2 border-white border-b-0"></div>
          <div class=" border-2 border-white border-r-0 border-b-0"></div>
        </div>
      </div>

      <div class=" h-36  w-36   border-solid border-2 border-white rounded m-5 
            hover:h-40 hover:w-40 transition-all ease-in-out duration-300
            min-[1400px]:h-80  min-[1400px]:w-80  min-[1400px]:hover:w-96 min-[1400px]:hover:h-96"
            @click="toggleGameOpen('Arkanoid')">
        <!-- <p>arkanoid</p> -->
        <div class="p-2 grid grid-cols-5 grid-rows-10 w-full h-full">
          <div v-for="(cell, i) in arkanArray" :key="i">
            <div class=" w-full h-full border-solid border-zinc-800 rounded" 
              :class="{ 'bg-white border-2': cell==1,  ' bg-red-600 rounded-none': cell==2}">
            </div>
          </div>
        </div>
      </div>

      <div class=" h-36  w-36   border-solid border-2 border-white rounded m-5 
            hover:h-40 hover:w-40 transition-all ease-in-out duration-300
            min-[1400px]:h-80  min-[1400px]:w-80  min-[1400px]:hover:w-96 min-[1400px]:hover:h-96"
            @click="toggleGameOpen('Snake')">
        <!-- <p>snake</p> -->
        <div class="p-2 grid grid-cols-10 grid-rows-10 w-full h-full">
          <div v-for="(cell, i) in snakeArray" :key="i">
            <div class=" w-full h-full  border-solid border-zinc-800 " 
              :class="{ 'bg-white': cell==1,  ' bg-red-600 rounded': cell==2}">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="gameOpen=='Tictactoe'">
    <Tictactoe @closeGame="toggleGameOpen"></Tictactoe>
  </div>
  <div v-if="gameOpen=='Arkanoid'">
    <Arkanoid @closeGame="toggleGameOpen"></Arkanoid>
  </div>
  <div v-if="gameOpen=='Snake'">
    <Snake :device="device" @closeGame="toggleGameOpen"></Snake>
  </div>

  </div>
  
  
</template>

<script>
import Arkanoid from './Arkanoid.vue';
import Snake from './Snake.vue';
import Tictactoe from './Tictactoe.vue';
import { ref } from 'vue';


export default {
  name: 'HomeView',
  components: {
    Tictactoe, Snake, Arkanoid
  },

  setup(){

    let gameOpen = ref("")

    let device = ref("")

    let toggleGameOpen = (gameName) => {
      console.log(gameName)
      gameOpen.value = gameName
    }

    //snake logo - service data
    let snakeArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 2, 0, 0, 0, 1, 1, 0, 0, 0,
                      0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                      0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                      0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
                      0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
                      0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
                      0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 1, 1, 1, 1, 1, 1, 1, 0, 0,] // 10c x 10r
    //arkan logo - service data
    let arkanArray = [1, 1, 1, 1, 1,
                      1, 0, 0, 1, 1,
                      0, 1, 0, 0, 0,
                      0, 1, 0, 1, 0,
                      0, 0, 0, 0, 0,
                      0, 0, 0, 0, 1,
                      0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0,
                      0, 2, 2, 0, 0] // 5c x 10r

    const getDevice = () => {
      let w = window.innerWidth
      console.log("screen width = ", w)
      if (w <= 1400){   //larger ipad w is 1366
        device.value = "mobile"}
      else if(w > 1400){
        device.value = "pc"}
      else device.value = "notFound"
      
    }

    getDevice()

    return{gameOpen, toggleGameOpen, arkanArray, snakeArray, getDevice, device}
  }

}
</script>
