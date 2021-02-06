import EventEmitter from 'eventemitter3';
import './carousel__controls.scss';
import './carousel__controls.html';

class CarouselControls extends EventEmitter {
    constructor({root}) {
        super();
        this.root = $(root);
        this.buttons = this.root.children('button');
        this.buttons.on('click', ev => this.handleClick(ev));
    }

    handleClick(ev) {
        ev.preventDefault();
        const target = $(ev.target);
        if (target.hasClass('carousel__next')) {
            this.emit('clicknext');
        } else {
            this.emit('clickprev');
        }
    }
}

export default CarouselControls;