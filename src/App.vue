<template>
  <div id="app">
    <h3>hello Vue</h3>
    <router-link to="/home">首页</router-link>
    &nbsp;<span>/</span>&nbsp;
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
  },
  mounted(){
    console.log(this.$router);
    console.log(this.$route);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
