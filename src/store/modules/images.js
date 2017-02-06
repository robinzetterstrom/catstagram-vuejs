export const Images = {
  state: {
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
  },
  mutations: {
    toggleImage (state, payload, shouldOpen) {
      // Find the image in the store and update the showModal value.
      const imageIndex = state.images.map(image => image.id).indexOf(payload.id)
      if (payload.shouldOpen) {
        if (state.images[imageIndex].showModal === false) {
          state.images[imageIndex].showModal = true;
        }
      } else {
        state.images[imageIndex].showModal = false;
      }
    }
  },
  actions: {
    toggleImage ({ commit }, payload) {
      commit('toggleImage', payload)
    }
  },
  getters: {
    images: (state) => {
      return state.images
    }
  }
}
