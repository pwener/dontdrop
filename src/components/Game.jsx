import React, { useEffect } from 'react';
import Ball from './Ball';
import CanvasBoard from './CanvasBoard';
import Holder from './Holder';

const frameRate = 1/20; // Seconds
const frameDelay = frameRate * 1000; // 40fps

const Game = (props) => {
  const canvasRef = React.useRef(null);

  const { space } = props;

  const ball = new Ball(frameRate, space);
  const holder = new Holder();
  let board;

  useEffect(() => {
    board = new CanvasBoard(canvasRef);
    board.initialize(ball, holder);
  }, []);

  const loop = () => {
    ball.move();
    board.loop(ball, holder, space);
  }

  useEffect(() => {
    let id = setInterval(loop, frameDelay);
    return () => clearInterval(id);
  });

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