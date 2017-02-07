import Vue from 'vue'
import Modal from 'src/components/Modal'
import store from '../../../src/store/index'

describe('Modal.vue', () => {
  const vm = new Vue({
    el: document.createElement('div'),
    data: {
      form: {
        username: '',
        comment: '',
        id: 3
      }
    },
    store,
    render: (h) => h(Modal)
  }).$mount();

  beforeEach(() => {
    vm.form.username = ''
    vm.form.comment = ''
  })

  let expectedComment = {
    username: 'Frank',
    text: 'My valid text for testing',
    image_id: 3,
    comment_id: 4,
    date: '2016-02-24'
  }

  it('should render correct contents', () => {
    expect(vm.$el.querySelectorAll('input').length).to.equal(3);
    expect(vm.$el.querySelector('.modal-header h3').textContent).to.equal('Comments')
  })

  it('sort comments by date with oldest comment at index 0', () => {
    let comments = Modal.computed.comments.call(vm)
    expect(comments[0]).to.be.deep.equal(expectedComment);
  })

  it('should allow users to post comments', () => {
    const initialCommentCount = vm.$store.getters.comments.length;
    vm.form.username = 'Almighty Tester'
    vm.form.comment = 'Lorem ipsum'

    Modal.methods.addComment.call(vm, vm.form);
    const newComments = vm.$store.getters.comments;

    expect(newComments.length).to.equal(initialCommentCount + 1);
  })

  it('should return error if comment validation fails', () => {
    const initialCommentCount = vm.$store.getters.comments.length;
    let errorResponse = Modal.methods.addComment.call(vm, vm.form)

    // Expect to get error in return if validation fails in addComment()
    expect(() => errorResponse()).to.throw(Error);
    const newComments = vm.$store.getters.comments;

    // Expect amount of comments to be untouched
    expect(newComments.length).to.equal(initialCommentCount);
  })
})

