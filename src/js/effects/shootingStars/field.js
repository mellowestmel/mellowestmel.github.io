import { ShootingStar } from "./class.js";
import { renderStar } from "./renderer.js";

const AREA_PER_STAR = 6000;

export class StarField {
    constructor(bounds) {
        this.bounds = bounds;
        this.stars = [];
        this.populate();
    }

    populate() {
        const starCount = Math.floor((this.bounds.width * this.bounds.height) / AREA_PER_STAR) || 0;
        for (let index = 0; index < starCount; index++) {
            this.stars.push(new ShootingStar(this.bounds));
        }
    }

    advanceAll(scale) {
        for (let index = 0; index < this.stars.length; index++) {
            this.stars[index].advance(scale);
        }
    }

    renderAll(context) {
        for (let index = 0; index < this.stars.length; index++) {
            renderStar(context, this.stars[index]);
        }

        context.globalAlpha = 1;
    }
}