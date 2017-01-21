<template>
  <li class="comment">
    <b>{{ comment.username }}: </b>
    <input v-if="isEditable" v-model="text" @keyup.enter="updateComment(comment)">
    <span v-else>{{ comment.text }}</span>
    <div class="buttons">
      <button class="btn-save" @click="updateComment(comment)" v-if="isEditable">Save</button>
      <button class="btn-edit" @click="editComment()" v-else>Edit</button>
      <button class="btn-delete" @click="removeComment(comment)" v-if="!isEditable">Delete</button>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'comment',
    props: ['comment'],
    data () {
      return {
        isEditable: false,
        text: this.comment.text,
        cachedText: ''
      }
    },
    methods: {
      removeComment (payload) {
        this.$store.dispatch('remove', payload)
      },
      editComment () {
        // Cache existing comment in case of invalid input.
        this.cachedText = this.text
        this.isEditable = true
      },
      updateComment (payload) {
        // Verify that new comment is 3-300 characters long.
        if (this.text.length > 2 && this.text.length <= 300) {
          const newComment = Object.assign({}, payload)
          newComment.text = this.text
          this.$store.dispatch('update', newComment)
          this.cachedText = ''
        } else {
          // Reset to previous comment in case of invalid input.
          this.text = this.cachedText
        }
        this.isEditable = false
      }
    }
  }
</script>

<style lang="scss">
  .comment {
    overflow-wrap: break-word;
    position: relative;
  }

  .buttons {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    align-items: center;
    height: 100%;
    width: 0;
    background-color: #efefef;
  }

  .btn-delete, .btn-edit, .btn-save {
    margin-right: 5px;
  }
  .comment:hover {
    .buttons {
      display: flex;
      width: auto;
    }
  }
</style>
