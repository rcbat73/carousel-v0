import CarouselControls from './__controls/carousel__controls';
import CarouselDots from './__dots/carousel__dots';
import CarouselSlider from './__slider/carousel__slider';

import './carousel.scss';

class Carousel {
    constructor({root}) {
        this.root = $(root);

        this.slides = new CarouselSlider({
            root: this.root.find('.carousel__slider')[0]
        });
        this.controls = new CarouselControls({
            root: this.root.find('.carousel__controls')[0]
        });
        this.dots = new CarouselDots({
            root: this.root.find('.carousel__dots')[0]
        });

        this.currentIndex = 0;

        this.controls.on('clicknext', () => this.nextSlide());
        this.controls.on('clickprev', () => this.prevSlide());
        this.dots.on('clickdot', index => this.slideTo(index));
    }

    slideTo(index) {
        this.slides.slideTo(index);
        this.dots.highlightDot(index);
        this.currentIndex = index;
    }

    nextSlide() {
        let nextIndex = Math.min(this.currentIndex + 1, this.slides.slideCount - 1);
        this.slideTo(nextIndex);
    }

    prevSlide() {
        let prevIndex = Math.max(this.currentIndex - 1, 0);
        this.slideTo(prevIndex);
    }
}

export default Carousel;