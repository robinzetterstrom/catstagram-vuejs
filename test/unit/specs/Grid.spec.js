import Vue from 'vue'
import Grid from 'src/components/Grid'

describe('Grid.vue', () => {
  it('should call the handleOpen function when image is clicked', (done) => {
    var image; 
    var spy1;
    spy1 = sinon.spy(Grid.methods, 'handleOpen');
    
    const vm = new Vue({
    el: document.createElement('div'),
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
      render: (h) => h(Grid)
    });

    image = vm.$el.querySelector('.image-container');
    image.click();

    setTimeout(function(){
      var closeBtn = vm.$el.querySelector('.modal-close button');
      closeBtn.click();
      
      setTimeout(function(){
        assert(spy2.called, 'handleClose was not called');
        spy2.restore();
        done();
      }, 500);
    }, 500);
  })

  it('should call the handleClose function when area outside the modal is clicked', () => {
    var image;
    var spy3;

    spy3 = sinon.spy(Grid.methods, 'handleClose');
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Grid)
    });

    image = vm.$el.querySelector('.image-container');
    image.click();

    setTimeout(function(){
      var outsideModal = vm.$el.querySelector('.modal-wrapper');
      outsideModal.click();
      
      setTimeout(function(){
        assert(spy3.called, 'handleClose was not called');
        spy3.restore();
        done();
      }, 500);
    }, 500);
  })

  it('handleOpen should update the showModal value to true if it is false', () => {
    var spy4;
    var fakeData;

    fakeData = { showModal: false };

    spy4 = sinon.spy(Grid.methods, 'handleOpen');
    Grid.methods.handleOpen(fakeData);

    assert(spy4.called, 'handleOpen was not called'); 
    expect(fakeData.showModal).to.equal(true); 
    
    spy4.restore();
  })

  it('handleOpen should NOT change the showModal value if it is true', () => {
    var spy5;
    var fakeData;

    fakeData = { showModal: true };

    spy5 = sinon.spy(Grid.methods, 'handleOpen');
    Grid.methods.handleOpen(fakeData);

    assert(spy5.called, 'handleOpen was not called'); 
    expect(fakeData.showModal).to.equal(true); 
    
    spy5.restore();
  })

})