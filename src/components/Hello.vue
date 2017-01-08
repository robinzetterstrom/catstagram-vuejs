<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>If you see a list below you have seen Axios in actions!</p>
    <ul>
      <li v-for="item in items">{{ item.company.name }}</li>
    </ul>
    <div class="test">
      <p>testing</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Fakestagram!',
      items: []
    }
  },

  methods: {
    axiosDemo () {
      axios.get('https://jsonplaceholder.typicode.com/users/')
      .then(response => { this.items = response.data })
      .catch(error => { console.debug(error) })
    }
  },

  created () {
    this.axiosDemo()
  }
}
</script>

<!-- Add "scoped" attribute to limit SASS to this component only -->
<style lang="scss">
$color: red;

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
  padding: 1em 0;
}

a {
  color: #42b983;
}
  .test {
    p { color: $color; }
  }
</style>
