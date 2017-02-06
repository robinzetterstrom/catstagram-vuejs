import Vue from 'vue'
import LatestComment from 'src/components/LatestComment'
import store from '../../../src/store/index'

describe('LatestComment.vue', () => {
  const vm = new Vue({
    el: document.createElement('div'),
    data: {
      latestcomment: {
        username: '',
        text: '',
        imageURL: '',
        id: ''
      }
    },
    store,
    render: (h) => h(LatestComment)
  });

  // We know that this dude will always be the oldest, if we dont decide to change the initialState mock
  let expectedComment = {
    username: 'Arvid',
    text: 'I want to cuddle with it!',
    imageURL: '/static/images/cat2.jpg',
    id: 2
  }

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.latestComment h3').textContent)
      .to.equal('Latest comment')
  })

  it('should fetch latest comment from store and be set to component data properties', () => {
    LatestComment.computed.latestComment.call(vm);
    expect(vm.latestcomment).to.be.eql(expectedComment)
  })

  it('should open when latest comment is clicked', (done) => {
    let state = vm.$store.getters.images;
    let image = vm.$el.querySelector('.clickableComment');
    // My custom assert to check state of showModal
    let modalAssert = (arr, bool) => {
      arr
      .filter(image => {
        if (image.showModal && image.id === expectedComment.id) {
          expect(image.id).to.be.equal(expectedComment.id);
          expect(image.showModal).to.be.equal(bool);
        }
      })
    }

    // Modal should not be open before we click the image
    modalAssert(state, false);

    // We now click the modal to show it....
    image.click()

    Vue.nextTick(() => {
      // Now the showModal should be set to true
      modalAssert(state, true);
      done();
    })
  })

  it('count comments and be a number', () => {
    LatestComment.computed.latestComment.call(vm);
    let counter = LatestComment.methods.countComments.call(vm, vm.latestcomment)

    // Can only be one comment, so lets make sure of that, shall we?
    expect(counter).to.be.equal(1).and.not.equal(2)
    // And we also expect the value to be a number
    expect(counter).not.to.be.NaN
    expect(Number.isInteger(counter)).to.be.equal(true)
  })
})
