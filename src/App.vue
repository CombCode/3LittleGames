<template>
  <div class=" bg-zinc-800 text-white flex flex-col h-screen">
    <div class="header mx-5 my-10">
      <h1 class=" font-sans text-4xl font-bold">New-Fashioned Games</h1>
    </div>
    <div class="body flex-grow">
      <HomeView></HomeView>
    </div>
    <div class="footer">
      <p></p>
    </div>
  </div>
</template>
<script>
  import HomeView from "./views/HomeView.vue"

  export default {
    components: {HomeView}
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.unselectable {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
