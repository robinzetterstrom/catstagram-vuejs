<template>
  <div class="latestComment">
    <h3>Latest comment</h3>
    <div class="clickableComment" v-bind:latest-comment="latestComment" v-on:click="handleOpen(latestcomment)">
        <img class="thumbnail" v-bind:src="latestcomment.imageURL"></img>
        <p>
          <b>{{ latestcomment.username }}:</b>
          <span>{{ latestcomment.text }}</span>
        </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'latestcomment',
    data () {
      return {
        latestcomment: {
          username: '',
          text: '',
          imageURL: '',
          id: ''
        }
      }
    },
    methods: {
      handleOpen: function (latestcomment) {
        this.$store.dispatch('toggleImage', {...latestcomment, shouldOpen: true})
      },
      countComments: function (obj) {
        return this.$store.getters.comments.filter(comments => comments.image_id === obj.id).length
      }
    },
    computed: {
      latestComment: function () {
        let noOfComments = this.$store.getters.comments.length - 1; // latest comment always pushed in last in the comments array
        let latestComment = this.$store.getters.comments[noOfComments];
        this.latestcomment.text = latestComment.text;
        this.latestcomment.username = latestComment.username;
        this.latestcomment.imageURL = `/static/images/cat${latestComment.image_id}.jpg`;
        this.latestcomment.id = latestComment.image_id;
      }
    }
  }
</script>

<style lang="scss">
  .clickableComment {
    width: 50%;
    height: 100px;
    margin: auto;
    background-color: #efefef;
    display: flex;
    align-items: center;

    .thumbnail {
      width: 100px;
      height: 100px;
      align-self: flex-start;
    }

    p {
      margin: auto;
    }

  @media (max-width: 800px) {
    width: 100%;
    }
  }
</style>
