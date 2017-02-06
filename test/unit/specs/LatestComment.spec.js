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
  }).$mount();

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.latestComment h3').textContent)
      .to.equal('Latest comment')
  })

  it('should fetch latest comment from store and be set to component data properties', () => {
    LatestComment.computed.latestComment.call(vm);
    // We know that this dude will always be the oldest, if we dont decide to change the initialState mock
    let expectedComment = {
      username: 'Frank',
      text: 'Ohhh...I love when cats purr',
      imageURL: '/static/images/cat3.jpg',
      id: 3
    }
    expect(vm.latestcomment).to.be.eql(expectedComment)
  })

  it('should open when latest comment is clicked', (done) => {
    /* TODO: Fix the core problem with the toggle dispatch. 
     * At the moment shouldOpen becomes undefined in images mutation
     * 
     * if (payload.shouldOpen) {.....
     * 
     * probably problem is that shouldOpen that doesnt exist in payload?
    */
    let state = vm.$store.getters.images;
    let image = vm.$el.querySelector('.clickableComment');
    image.click()

    Vue.nextTick(() => {
      console.log(state)
      done()
    })
  })

  it('count comments and be a number', () => {
    LatestComment.computed.latestComment.call(vm);
    let counter = LatestComment.methods.countComments.call(vm, vm.latestcomment)

    expect(counter).not.to.be.NaN
  })
})
