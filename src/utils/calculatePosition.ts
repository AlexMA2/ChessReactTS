import { BLACK_COLOR, WHITE_COLOR } from "../constants/Chess";
import { Position } from "../models/Position";

export const calculatePosition = (
  playerColor: string,
  x: number,
  y: number
): Position => {
  let posX = 0;
  let posY = 0;
  if (playerColor === WHITE_COLOR) {
    posX = 100 * x;
    posY = 800 - (y + 1) * 100;
  }
  if (playerColor === BLACK_COLOR) {
    posX = 100 * (7 - x);
    posY = 100 * y;
  }

  return {
    x: posX,
    y: posY,
  };
};
