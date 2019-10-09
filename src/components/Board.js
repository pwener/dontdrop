/**
 * Engine interface.
 * 
 * @flow
 */
import Ball from './Ball';

export interface Board {
   initialize(ball: Ball): void;
   loop(ball: Ball, space: { width: number, height: number }): void;
 }