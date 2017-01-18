import Vue from 'vue'
import Modal from 'src/components/Modal'

describe('Modal.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Modal)
    })
    expect(vm.$el.querySelector('.modal-header h3').textContent)
      .to.equal('Comments')
  })

  xit('should display an image with the same url as the image that was clicked on', () => {})

  xit('should display the comments belonging to that image', () => {})

  xit('should should allow users to post comments', () => {})

  xit('should should allow users to edit comments', () => {})

  xit('should should allow users to delete comments', () => {})
})