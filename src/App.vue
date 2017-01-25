<template>
  <div id="app">
    <header>
      <img src="/static/images/catstagram.png" alt="Catstagram">
    </header>
    <latestcomment></latestcomment>
    <grid></grid>
  </div>
</template>

<script>
import Grid from './components/Grid'
import LatestComment from './components/LatestComment'

export default {
  name: 'app',
  components: {
    grid: Grid,
    latestcomment: LatestComment
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  display: flex;
  justify-content: center;
  background: #f5f5f5;
  box-shadow: 1px 1px 1px #e4e4e4;
  padding: .5em 0;
  img { width: auto; height: 50px; }
}
</style>
