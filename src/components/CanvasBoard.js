/* @flow */
import { Board } from './Board';
import Ball from './Ball';
import Holder from './Holder';
import Obstacle from './Obstacle';
import { Space } from './Types';


// control object based in HTML and browsers keyboard
const controls : {
  values: Array <number>,
  [key: number]: string
} = {
  values: [37, 38, 39, 40],
};

controls[37] = "left";
controls[38] = "top";
controls[39] = "right";
controls[40] = "down";

/**
 * Implementation of board using html canvas
 */
class CanvasBoard implements Board {
  /**
   * DOM Context from React component
   */
  ctx: any;
  moveCallback: (position: string) => void;

  constructor (canvasRef: any, moveCallback: (position: string) => void) {
    this.ctx = canvasRef.current.getContext("2d");
    this.moveCallback = moveCallback;
  }

  /**
   * @override
   */
  initialize(ball: Ball, holder: Holder) {
    // draw init sprites
    // draw ball
    this.render(() => this.drawBall(ball));
    // draw holder
    this.render(() => this.drawHolder(holder));
    // add listener of keyboard event
    document.addEventListener('keydown', this.controlListener, false);
  }

  /**
   * @override
   */
  loop(ball: Ball, holder: Holder, obstacles: Array<Obstacle>, space: Space ) {
    // clear canvas
    this.ctx.clearRect(0, 0, space.width, space.height);    
    this.ctx.save();

    // draw ball
    this.render(() => this.drawBall(ball));

    // draw holder
    this.render(() => this.drawHolder(holder));

    // draw obstacle
    this.render(() => this.drawObstacle(obstacles));

    this.ctx.restore();
  }

  /**
   * Based in browser and HTML
   * 
   * @param evt is a JS event fired when user type in keyboard
   */
  controlListener = (evt: any) => {
    const { keyCode } = evt;

    evt.preventDefault();

    if (controls.values.includes(keyCode)) {
      this.moveCallback(controls[keyCode]);
    }
  }

  render(callback: () => void) {
    this.ctx.beginPath();
    
    callback();

    this.ctx.fill();
    this.ctx.closePath();
  }

  drawHolder(holder: Holder) {
    this.ctx.rect(holder.coordinate.x, holder.coordinate.y, holder.size.width, holder.size.height);
  }

  drawBall(ball: Ball) {
    this.ctx.arc(ball.position.x, ball.position.y, ball.RADIUS, 0, 2 * Math.PI);
  }

  drawObstacle(obstacles: Array<Obstacle>) {
    obstacles.map(o => {
      this.ctx.rect(o.position.x, o.position.y, 10, 10);
    })
  }
}

export default CanvasBoard;