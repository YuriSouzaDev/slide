export default class slide {
  constructor(slide, wraper) {
    this.slide = document.querySelector(slide);
    this.wraper = document.querySelector(wraper);
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.wraper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wraper.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEvents() {
    this.wraper.addEventListener("mousedown", this.onStart);
    this.wraper.addEventListener("touchstart", this.onStart);
    this.wraper.addEventListener("mouseup", this.onEnd);
    this.wraper.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    // bind do objeto ao callback
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // slide configs

  slidePosition(slide) {
    const margin = (this.wraper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {
        position,
        element,
      };
    });
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activesSlide = this.slideArray[index];
    this.moveSlide(activesSlide.position);
    this.slideIndexNav(index);
    this.dist.finalPosition = activesSlide.position;
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}
