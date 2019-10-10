// @flow
import React, { useState, useEffect } from 'react';
import Ball from './Ball';
import CanvasBoard from './CanvasBoard';
import Holder from './Holder';
import Obstacle from './Obstacle';

const frameRate = 1/50; // Seconds
const frameDelay = frameRate * 1000; // 40fps

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const Game = (props) => {
  const canvasRef = React.useRef(null);

  const { space } = props;
  let holder = new Holder();
  let ball = new Ball(frameRate, space);
  const obstacles: Array<Obstacle> = [];
  let board;

  useEffect(() => {
    board = new CanvasBoard(canvasRef, holder.moveCallback);
    board.initialize(ball, holder);
  }, []);

  const obstacleGenerate = () => {
    obstacles.forEach(o => o.position.x = o.position.x - 2);
    // TODO remove magic number
    obstacles.filter(o => o.position.x < -10);

    const obstaclePos = { x: space.width, y: getRandomArbitrary(0, space.height)};
    let isNext = false;

    obstacles.slice(-10).forEach(o => {
      if(o.isNext(obstaclePos)) {
        isNext = true;
        return;
      }
    });

    if (!isNext) {
      obstacles.push(new Obstacle(obstaclePos));
    }
  }

  const loop = () => {
    // obstacleGenerate();
    ball.move(holder);
    board.loop(ball, holder, obstacles, space);
  }

  useEffect(() => {
    let id = setInterval(loop, frameDelay);
    return () => clearInterval(id);
  });

  const restart = () => {
    ball = new Ball(frameRate, space);
    holder = new Holder();
  }

  return (
    <div>
      <canvas
        style={{ border: '1px solid black'}}
        ref={canvasRef}
        width={space.width}
        height={space.height}
      />
      <br />
      <button onClick={restart}>Restart</button>
    </div>
  )
}

export default Game;