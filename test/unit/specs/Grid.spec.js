import Vue from 'vue'
import Grid from 'src/components/Grid'
import store from '../../../src/store/index'

//Timeout functions needed due to lag when clicking on elements & updating fake data passed to functions
//Rendering in each 'it' instead of in an beforeEach function due to mysterious errors with spies if beforeEach is used

describe('Grid.vue', () => {
  it('should call the handleOpen function when image is clicked', (done) => {
    var image; 
    var spy1;

    spy1 = sinon.spy(Grid.methods, 'handleOpen');
  
    const vm = new Vue({
      el: document.createElement('div'),
      store,
      render: (h) => h(Grid)
    });

    image = vm.$el.querySelector('.image-container');
    image.click();

    setTimeout(function(){ 
      assert(spy1.called, 'handleOpen was not called');
      spy1.restore();
      done();
    }, 500);
  })

  it('should call the handleClose function when closing button on modal is clicked', (done) => {
    var image;
    var spy2;

    spy2 = sinon.spy(Grid.methods, 'handleClose');
    const vm = new Vue({
      el: document.createElement('div'),
      store,
      render: (h) => h(Grid)
    });

    // selecting first picture in grid and opening it in a modal
    image = vm.$el.querySelector('.image-container');
    image.click();

    setTimeout(function(){
      var closeBtn = vm.$el.querySelector('.modal-close button');
      closeBtn.click();
      
      setTimeout(function(){
        assert(spy2.called, 'handleClose was not called');
        spy2.restore();
        done();
      }, 100);
    }, 100);
  })

  it('should call the handleClose function when area outside the modal is clicked', () => {
    var image;
    var spy3;

    spy3 = sinon.spy(Grid.methods, 'handleClose');
    const vm = new Vue({
      el: document.createElement('div'),
      store,
      render: (h) => h(Grid)
    });

    // selecting first picture in grid and opening it in a modal
    image = vm.$el.querySelector('.image-container');
    image.click();

    setTimeout(function(){
      var outsideModal = vm.$el.querySelector('.modal-wrapper');
      outsideModal.click();
      
      setTimeout(function(){
        assert(spy3.called, 'handleClose was not called');
        spy3.restore();
        done();
      }, 100);
    }, 100);
  })

  it('handleOpen should update the showModal value to true if it is false', () => {
    var fakeData;

    fakeData = { showModal: false, id: 2 };

    const vm = new Vue({
      el: document.createElement('div'),
      store,
      render: (h) => h(Grid)
    });
    
    Grid.methods.handleOpen.call(vm, fakeData);

    setTimeout(function(){
      expect(fakeData.showModal).to.equal(true);
    }, 100);
  })

  it('handleOpen should NOT change the showModal value if it is true', () => {
    var fakeData;

    fakeData = { showModal: true, id:2 };

    const vm = new Vue({
      el: document.createElement('div'),
      store,
      render: (h) => h(Grid)
    });

    Grid.methods.handleOpen.call(vm, fakeData);

    setTimeout(function(){
      expect(fakeData.showModal).to.equal(true); 
    }, 100);
  })

  it('countComments should return the number of comments for the picture', () => {
    var fakeData;
    var noOfComments;
    var noOfActualComments;

    const vm = new Vue({
      el: document.createElement('div'),
      store,
    });

    fakeData = { id: 3 }; //image with known mock comments, might change

    noOfComments = Grid.methods.countComments.call(vm, fakeData);
    noOfActualComments = vm.$store.getters.comments.filter(comments => { return comments.image_id === fakeData.id }).length;
    expect(noOfComments).to.equal(noOfActualComments); 
  })
})