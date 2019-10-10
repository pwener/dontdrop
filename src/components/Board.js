/**
 * Engine interface.
 * 
 * @flow
 */
import Ball from './Ball';
import Holder from './Holder';
import Obstacle from './Obstacle';
import { Space } from './Types';

export interface Board {
   initialize(ball: Ball, holder: Holder): void;
   loop(
     ball: Ball,
     holder: Holder,
     obstacles: Array<Obstacle>,
     space: Space
    ): void;
 }