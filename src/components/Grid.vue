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
      handleOpen: function (obj) {
        if (obj.showModal === false) {
          obj.showModal = true
        }
      },
      handleClose: function (obj) {
        obj.showModal = false
      },
      countComments: function (obj) {
        return this.$store.getters.comments.filter(comments => { return comments.image_id === obj.id }).length
      }
    },
    data () {
      return {
        msg: 'I am Grid!',
        images: [
          {
            id: 1,
            url: '/static/images/cat1.jpg',
            showModal: false
          },
          {
            id: 2,
            url: '/static/images/cat2.jpg',
            showModal: false
          },
          {
            id: 3,
            url: '/static/images/cat3.jpg',
            showModal: false
          },
          {
            id: 4,
            url: '/static/images/cat4.jpg',
            showModal: false
          },
          {
            id: 5,
            url: '/static/images/cat5.jpg',
            showModal: false
          },
          {
            id: 6,
            url: '/static/images/cat6.jpg',
            showModal: false
          },
          {
            id: 7,
            url: '/static/images/cat7.jpg',
            showModal: false
          },
          {
            id: 8,
            url: '/static/images/cat8.jpg',
            showModal: false
          },
          {
            id: 9,
            url: '/static/images/cat9.jpg',
            showModal: false
          }
        ]
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
