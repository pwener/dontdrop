import React, { useEffect } from 'react';
import Ball from './Ball';

const frameRate = 1/40; // Seconds
const frameDelay = frameRate * 1000; // 40fps

const Game = (props) => {
  const canvasRef = React.useRef(null);

  const { space } = props;

  const ball = new Ball(frameRate, space);

  let ctx = null;

  useEffect(() => {
    ctx = canvasRef.current.getContext("2d");
    // draw init sprites
    ctx.beginPath();
    ctx.arc(ball.position.x, ball.position.y, ball.RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
  }, []);

  const loop = () => {
    ball.move();

    ctx.clearRect(0, 0, space.width, space.height);    
    ctx.save();

    ctx.translate(ball.position.x, ball.position.y);

    ctx.beginPath();
    ctx.arc(0, 0, ball.RADIUS, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }

  const looperTime = setInterval(loop, frameDelay);

  return (
    <div>
      <canvas
        style={{ border: '1px solid black'}}
        ref={canvasRef}
        width={space.width}
        height={space.height}
      />
    </div>
  )
}

export default Game;