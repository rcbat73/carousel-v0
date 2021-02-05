import EventEmitter from 'eventemitter3';
import './carousel__dots.scss';

class CarouselDots extends EventEmitter {
  constructor({root}) {
    super()
    this.root = $(root)
    this.dots = this.root.children('.carousel__dot')
    this.dots.on('click', ev => this.handleClick(ev))
  }

  handleClick(ev) {
    ev.preventDefault()
    const index = this.dots.index(ev.target)
    this.highlightDot(index)
    this.emit('clickdot', index)
  }

  highlightDot(index) {
    this.dots.removeClass('carousel__dot--active')
    this.dots.eq(index).addClass('carousel__dot--active')
  }
}

export default CarouselDots