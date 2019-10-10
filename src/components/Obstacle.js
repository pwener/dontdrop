/** @flow */
import { Vector } from './Types';

class Obstacle {
  position: Vector;

  constructor(position: Vector) {
    this.position = position;
  }

  isNext(position: Vector): boolean {
    return this.position.x < position.x + 100 && this.position.x > position.x - 100 &&
      this.position.y < position.y + 100 && this.position.y > position.y - 100;
  }
}

export default Obstacle;