import './carousel__slider.scss';

class CarouselSlider {
  constructor({root}) {
    this.root = $(root);
    this.slides = this.root.find('.carousel__slide');
    this.slideList = this.root.children('.carousel__slides-list');
  }

  get slideCount() {
    return this.slides.length;
  }

  slideTo(index) {
    this.slideList.css({transform: `translateX(-${100 * index}%)`});
  }
}

export default CarouselSlider;