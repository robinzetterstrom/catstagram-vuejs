<template>
  <div>
    <div class="grid">
      <div class="image" v-for="image in images" v-bind:data-comments="image.comments">
        <img v-bind:src="image.url">
      </div>
    </div>
  </div>
</template>

<style>
  .grid{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    margin: 0 10%;
    padding: 1%;
  }

  .image {
    height: 30%;
    width: 30%;
    min-width: 300px;
    margin: 1%;
    position: relative;
  }

  .image:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
    opacity: 0;
    transition: opacity 0.5s;
  }

  .image:before {
    content: attr(data-comments);
    position: absolute;
    top: 50%;
    opacity: 0;
    z-index: 1;
    color: #fff;
    width: 100%;
    text-align: center;
  }

  .image:hover:after, .image:hover:before {
    opacity: 1;
  }

  img {
    width: 100%;
    vertical-align: top;
  }
</style>
<script>
  export default{
    name: 'grid',
    data () {
      return {
        msg: 'I am Grid!',
        images: [
          {
            url: 'http://lorempixel.com/600/600/cats/',
            comments: 1
          },
          {
            url: 'http://lorempixel.com/600/600/cats/',
            comments: 1
          },
          {
            url: 'http://lorempixel.com/600/600/cats/',
            comments: 1
          },
          {
            url: 'http://lorempixel.com/600/600/cats/',
            comments: 1
          },
          {
            url: 'http://lorempixel.com/600/600/cats/',
            comments: 1
          },
          {
            url: 'http://lorempixel.com/600/600/cats/',
            comments: 1
          },
          {
            url: 'http://lorempixel.com/600/600/cats/',
            comments: 1
          },
          {
            url: 'http://lorempixel.com/600/600/cats/',
            comments: 1
          },
          {
            url: 'http://lorempixel.com/600/600/cats/',
            comments: 1
          }
        ]
      }
    }
  }
</script>
