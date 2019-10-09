/* @flow */
import Board from './Board';
import Ball from './Ball';
import Holder from './Holder';

class CanvasBoard implements Board {
  /**
   * DOM Context from React component
   */
  ctx: any;

  constructor (canvasRef: any) {
    this.ctx = canvasRef.current.getContext("2d");
  }

  initialize(ball: Ball, holder: Holder) {
    // draw init sprites
    this.ctx.beginPath();
    // this.drawBall(ball);
    this.drawHolder(holder);
    this.ctx.stroke();
  }

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