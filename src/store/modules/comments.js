const mockComments = require('../mocks/comments.json')
const moment = require('moment')

export const Comments = {
  state: { comments: mockComments },
  mutations: {
    add (state, payload) {
      // Validate input before dispatch to the store
      if (payload.username.length > 2 && payload.comment.length > 3 && payload.comment.length <= 300) {
        state.comments.push({
          'username': payload.username,
          'text': payload.comment,
          'image_id': payload.id,
          // Use milliseconds to create unique ID
          'comment_id': new Date().getTime(),
          'date': moment().locale('sv').format('L')
        })
      }
    },
    remove (state, payload) {
      // Find the comment in the store and remove it.
      const commentIndex = state.comments.map(comment => comment.comment_id).indexOf(payload.comment_id)
      state.comments.splice(commentIndex, 1)
    },
    update (state, payload) {
      // Find the comment in the store and update its text property.
      const commentIndex = state.comments.map(comment => comment.comment_id).indexOf(payload.comment_id)
      state.comments[commentIndex].text = payload.text
    }
  },
  actions: {
    add ({ commit }, payload) {
      commit('add', payload)
    },
    remove ({ commit }, payload) {
      commit('remove', payload)
    },
    update ({ commit }, payload) {
      commit('update', payload)
    }
  },
  getters: {
    comments: (state) => {
      return state.comments
    }
  }
}
