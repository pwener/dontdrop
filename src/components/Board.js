/**
 * Engine interface.
 * 
 * @flow
 */
import Ball from './Ball';
import Holder from './Holder';

export interface Board {
   initialize(ball: Ball, holder: Holder): void;
   loop(ball: Ball, holder: Holder, space: { width: number, height: number }): void;
 }