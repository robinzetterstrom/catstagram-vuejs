<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self.stop="$emit('childToggle')">
        <div class="modal-container">

          <div class="modal-image-container">
            <img class="modal-image" v-bind:src="link"> 
          </div>

          <div class="comments-section">
            <div class="modal-close">
                <button class="modal-default-button" @click.stop="$emit('childToggle')">
                  Close
                </button>
            </div>

            <div class="modal-header">
              <h3> Comments </h3>
            </div>

            <div class="modal-body">
              <ul>
                <li v-for="comment in comments">
                  <b>{{ comment.username }} - </b> {{ comment.text }}
                </li>
              </ul>
            </div>
          </div>
          <div class="post-comment">
              <form id="form">
                <input type="username" v-model="form.username" placeholder="Username">
                <input type="comment" v-model="form.comment" placeholder="Write your comment here...">
                <input type="submit" @click.prevent="addComment(form)" value="Post comment">
              </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default{
    name: 'modal',
    props: ['id', 'link'],
    data () {
      return {
        form: {
          username: '',
          comment: '',
          id: this.id
        }
      }
    },
    methods: {
      addComment (payload) {
        // We pass in our form input and dispatch to store action 'add' and pass our payload to the store
        this.$store.dispatch('add', payload)
          // ... after submit comment, reset form fields
        this.form.username = ''
        this.form.comment = ''
      }
    },
    computed: {
      comments () {
        return this.$store.getters.comments.filter(comments => { return comments.image_id === this.form.id })
      }
    }
  }
</script>


<style lang="scss">
.modal-header, .modal-body, .modal-close, .post-comment {
  text-align: left;
  box-sizing: border-box;
  padding: 10px 20px;
}

.modal-mask {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  z-index: 4;
  width: 800px;
  height: 400px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.comments-section {
  height: 80%;
  border-bottom: 1px solid black;  
}

.post-comment {
  padding: 10px;
}

.modal-header {
  float: right;
  width: 50%;
  text-align: center;
  h3 {
    margin: 0;
    color: #42b983;
  }
}

.modal-body {
  height: 80%;
  display: block;
  width: 50%;
  float: right;
  overflow: scroll;
  ul { margin: 0; padding: 0; }
  li {
    list-style: none;
    padding: .5em;
    color: #777;
    background: #efefef;
    margin-top: .5em;
  }
}

.modal-close {
  float: right;
  height: 20px;
  width: auto;

  .modal-default-button {
    float: right;
  }
}

.post-comment {
  width: 50%;
  float: right;
}

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .modal-image-container {
    float: left;
    width: 50%;
  }

  .modal-image {
    width: 400px;
    height: 400px;
  }
</style>
