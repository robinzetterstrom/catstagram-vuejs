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
          'date': moment().locale('sv').format('L')
        })
      }
    }
  },
  actions: {
    add ({ commit }, payload) {
      commit('add', payload)
    }
  },
  getters: {
    comments: (state) => {
      return state.comments
    }
  }
}
