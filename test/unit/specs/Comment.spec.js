import Vue from 'vue'
import Comment from 'src/components/Comment'
import store from '../../../src/store/index'

describe('Comment.vue', () => {
  // Helper function to create component instances with props
  function getComp (Component, propsData) {
    const Ctor = Vue.extend(Component);
    const vm = new Ctor({ propsData }).$mount();
    return vm
  }

  const commentComponent = getComp(Comment, {comment: { text: 'Test text sent as prop' }});
  
  it('should set correct default data', () => {
    expect(commentComponent.isEditable).to.equal(false);
    expect(commentComponent.text).to.equal('Test text sent as prop');
    expect(commentComponent.cachedText).to.equal('');
  });
});

describe('Comment.vue', () => {
  const vm = new Vue({
    el: document.createElement('div'),
    data: {
      isEditable: false,
      text: 'Text for testing',
      cachedText: ''
    },
    store
  });
  it('should remove the specified comment from the store when calling removeComment()', () => {
    const initialCommentCount = vm.$store.getters.comments.length;
    const comment = vm.$store.getters.comments[2];

    Comment.methods.removeComment.call(vm, comment);
    const newComments = vm.$store.getters.comments;

    expect(newComments.length).to.equal(initialCommentCount - 1);
    expect(newComments).to.not.include(comment);
  });

  it('should toggle the isEditable boolean and cache current text value when calling editComment()', () => {
    Comment.methods.editComment.call(vm);
    expect(vm.isEditable).to.equal(true);
    expect(vm.cachedText).to.equal(vm.text)
  });

  it('should set text to cachedText if comment is shorter than 3 characters long, when calling updateComment()', () => {
    vm.cachedText = "Test text for cachedText.";
    vm.text = "12";

    Comment.methods.updateComment.call(vm);
    expect(vm.text).to.equal(vm.cachedText);
  });

  it('should set text to cachedText if comment is longer than 300 characters long, when calling updateComment()', () => {
    vm.text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus ante, eleifend tempus odio ac,
    hendrerit imperdiet dui. Fusce sollicitudin auctor mauris, id aliquam mauris sagittis quis.
    Praesent eu est ultricies, ultricies purus sit amet, tincidunt urna. Fusce sollicitudin lorem dictum volutpat`;

    Comment.methods.updateComment.call(vm);
    expect(vm.text).to.equal(vm.cachedText);
  });

  it('should update text in store and reset cachedText if input is valid (3-300 characters long) when updateComment() is called', () => {
    vm.text = "My valid text for testing";
    const comment = vm.$store.getters.comments[0];

    Comment.methods.updateComment.call(vm, comment);

    expect(comment.text).to.equal(vm.text);
    expect(vm.cachedText).to.equal('');
  });
});
