<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self.stop="$emit('childToggle')">
        <div class="modal-container">

          <div class="modal-image-container">
            <img class="modal-image" v-bind:src="link">
          </div>

          <div class="modal-comments">
          <div class="comments-section">
            <div class="modal-close">
                <button class="modal-default-button" @click.stop="$emit('childToggle')">
                  x
                </button>
            </div>

            <div class="modal-header">
              <h3>Comments</h3>
            </div>

            <div class="modal-body">
              <ul>
                <comment v-for="comment in comments" v-bind:comment="comment"></comment>
              </ul>
            </div>
          </div>
          <div class="post-comment">
              <form id="form">
              <div class="input">
                <input type="username" v-model="form.username" placeholder="Username">
                <input type="comment" v-model="form.comment" placeholder="Write your comment here...">
              </div>
              <div class="submit"> 
                <input type="submit" @click.prevent="addComment(form)" value="Post comment">
              </div>
              </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Comment from './Comment'

  export default{
    name: 'modal',
    components: {
      Comment
    },
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
        return this.$store.getters.comments
        .filter(comments => { return comments.image_id === this.form.id })
        .sort((a, b) => {
          if (a.date < b.date) {
            return -1
          }
          if (a.date > b.date) {
            return 1
          }
        })
      }
    }
  }
</script>


<style lang="scss">
.modal-header, .modal-body, .modal-close {
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
}

.modal-header {
  padding-top: 0;
  padding-bottom: 0;
  text-align: center;
  height: 10%;
  h3 {
    margin: 0;
    color: #f7754e;
  }
}

.modal-body {
  height: 80%;
  display: block;
  overflow-y: auto;
  padding-top: 0;
  ul { margin: 0; padding: 0; }
  li {
    list-style: none;
    padding: .7em;
    color: #777;
    background: #efefef;
    margin-top: .5em;
    word-break: break-all;
    &:first-child {
      margin-top: .5em; 
    }
  }
}

.modal-close {
  padding: 7px 7px 0 0;
  height: 10%;

  .modal-default-button {
    background-color: #efefef;
    width: 25px;
    height: 25px;
    float: right;
    border-radius: 100%;
    font-weight: 900;
    font-size: 12px;
    border: 2px solid #e4e4e4;

    &:hover {
      border-color: #f7754e;
      }
    
    &:active {
        background-color: #d55c3c;
      }
    }
}

.post-comment {
  box-sizing: border-box;
  height: 20%;
  border-top: 2px solid #f7754e;
  background-color: #f7f7f7;

form {
  height: 100%;
}

div.input {
    width: 70%;
    height: 100%;
    float: left;
    display: flex; 
    flex-direction: column;
    justify-content: center;

    input {
      width: 90%;
      margin-left: 4%;
      border-radius: 25px;
      border: 2px solid #efefef;
      padding: 5px;
      &:first-child {
       margin-bottom: 2%;
      }
    }
  }

  div.submit {
    width: 30%;
    height: 100%;
    float: right;
    display: flex; 
    justify-content: flex-end;

    input {
      align-self: center;
      height: 40px;
      margin-right: 10%;
      background-color: #e4e4e4;
      border: 2px solid #efefef;
      border-radius: 25px;

      &:hover, &:active {
        border-color: #f7754e;
      }

      &:active {
        background-color: #d55c3c;
      }
    }
  }
}


.post-comment {
  width: 100%;
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

  .modal-comments {
    float: right;
    width: 50%;
    height: 100%;
  }
  .modal-image {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 800px) {

  .modal-container {
    width: 400px;
    height: 800px;
  }
   .modal-comments, .modal-image-container  {
      width: 100%;
      height: 400px;
    }
}
</style>
