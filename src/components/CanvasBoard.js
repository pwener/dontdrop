/* @flow */
import { Board } from './Board';
import Ball from './Ball';
import Holder from './Holder';

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
  loop(ball: Ball, holder: Holder, space: { width: number, height: number }) {
    // clear canvas
    this.ctx.clearRect(0, 0, space.width, space.height);    
    this.ctx.save();

    // draw ball
    this.render(() => this.drawBall(ball));

    // draw holder
    this.render(() => this.drawHolder(holder));

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

  render(callback: any) {
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
}

export default CanvasBoard;