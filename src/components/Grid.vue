<template>
  <div>
    <div class="grid">
      <div class="image-container" v-for="image in images" v-bind:data-comments="countComments(image)" v-on:click="handleOpen(image)">
        <img class="image" v-bind:src="image.url">
        <modal v-bind:id="image.id" v-bind:link="image.url" v-on:childToggle="handleClose(image)" v-if="image.showModal"></modal>
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from './Modal'

  export default{
    name: 'grid',
    components: {
      Modal
    },
    methods: {
      handleOpen: function (payload) {
        this.$store.dispatch('toggleImage', {...payload, functionality: 'open'})
      },
      handleClose: function (payload) {
        this.$store.dispatch('toggleImage', {...payload, functionality: 'close'})
      },
      countComments: function (obj) {
        return this.$store.getters.comments.filter(comments => { return comments.image_id === obj.id }).length
      }
    },
    data () {
      return {
        images: this.$store.getters.images
      }
    }
  }
</script>


<style lang="scss">
  .grid{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    margin: 0 10%;
    padding: 1%;
  }

  .image-container {
    position: relative;
    margin: 1%;
    width: 30%;
    min-width: 300px;

    &:before, &:after {
      position: absolute;
      width: 100%;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &:before {
      content: attr(data-comments);
      top: 50%;
      z-index: 1;
      color: #fff;
      text-align: center;
    }

    &:after {
      content: '';
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.6);
    }

    &:hover:before, &:hover:after {
      opacity: 1;
    }
  }

  .image {
    width: 100%;
    vertical-align: top;
  }
</style>
