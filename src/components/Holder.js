/**
 * Class with logic of Game holder
 * @flow
 */

type Vector = {
  x: number,
  y: number,
};

class Holder {
  MOVEMENT_SIZE: number = 10;
  coordinate: Vector;
  moveCallback: any;
  size: { width: number, height: number };

  constructor() {
    this.coordinate = { x: 250, y: 50};
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
}

 export default Holder;