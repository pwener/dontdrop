/* @flow */
import Board from './Board';
import Ball from './Ball';

class CanvasBoard implements Board {
  /**
   * DOM Context from React component
   */
  ctx: any;

  constructor (canvasRef: any) {
    this.ctx = canvasRef.current.getContext("2d");
  }

  initialize(ball: Ball) {
    // draw init sprites
    this.ctx.beginPath();
    this.ctx.arc(ball.position.x, ball.position.y, ball.RADIUS, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  loop(ball: Ball, space: { width: number, height: number }) {
    ball.move();

    this.ctx.clearRect(0, 0, space.width, space.height);    
    this.ctx.save();

    this.ctx.translate(ball.position.x, ball.position.y);

    this.ctx.beginPath();
    this.ctx.arc(0, 0, ball.RADIUS, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
  }
}

export default CanvasBoard;