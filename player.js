class Player {
  constructor() {
    this.r = 60;
    this.x = w / 2;
    this.y = h - this.r;
    this.speed = 2;
    this.direction = 'still';
  }

  display() {
    rect(this.x, this.y, this.r, this.r);

  }
  move() {
    switch (this.direction) {
      case 'still':
        // dont move anything
        break;
      case 'up':
        // decrease y position
        if (this.y > 0) {
          this.y -= this.speed;
        }
        break;
      case 'down':
        // increas y position
        if (this.y < h - this.r) {
          this.y += this.speed;
        }
        break;
      case 'right':
        // increase x position
          if (this.x < h - this.r) {
        this.x += this.speed;
      }
        break;
      case 'left':
        // decrease x posititon
          if (this.x < h + this.r) {
        this.x -= this.speed;
      }
        break;
      default:
        break;

    }
  }
}
