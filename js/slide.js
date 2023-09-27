export default class slide {
  constructor(slide, wraper) {
    this.slide = document.querySelector(slide);
    this.wraper = document.querySelector(wraper);
  }

  onStart(event) {
    event.preventDefault();
    this.wraper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {}

  onEnd() {
    this.wraper.removeEventListener("mousemove", this.onMove);
  }

  addSlideEvents() {
    this.wraper.addEventListener("mousedown", this.onStart);
    this.wraper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    // bind do objeto ao callback
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
