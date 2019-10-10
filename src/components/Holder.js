/**
 * Class with logic of Game holder
 * @flow
 */
import { Vector } from './Types';

class Holder {
  MOVEMENT_SIZE: number = 10;
  coordinate: Vector;
  moveCallback: any;
  size: { width: number, height: number };

  constructor() {
    this.coordinate = { x: 200, y: 250};
    this.size = { width: 100, height: 10 };

    // to use outside
    this.moveCallback = this.move.bind(this);
  }

  /**
   * TODO refactor to functional way
   *
   * @param {*} position 
   */
  move(position: "left" | "right" | "top" | "down") {
    switch(position) {
      case "left": {
        this.coordinate.x =  this.coordinate.x - this.MOVEMENT_SIZE;
        break;
      }
      case "right": {
        this.coordinate.x = this.coordinate.x + this.MOVEMENT_SIZE;
        break;
      }
      case "top": {
        this.coordinate.y = this.coordinate.y - this.MOVEMENT_SIZE;
        break;
      }
      case "down": {
        this.coordinate.y = this.coordinate.y + this.MOVEMENT_SIZE;
        break;
      }
      default: throw new Error("Invalid movement");
    }
  }

  /**
   * Check if target and toCompare belongs to one interval with delta error
   */
  belongsToInterval(target: number, toCompare: number, delta: number = 10) {
    return toCompare >= Math.round(target) - delta && toCompare <= Math.round(target) + delta;
  }

  /**
   * Check if something in that position hit the holder
   * 
   * @param {*} position Vector of another element
   */
  checkIfHit(position: Vector) {
    return this.belongsToInterval(position.y, this.coordinate.y) && 
      ( Math.round(position.x) >= this.coordinate.x && 
        Math.round(position.x) <= (this.coordinate.x + this.size.width))
  }
}

 export default Holder;