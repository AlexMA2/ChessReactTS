import { BLACK_COLOR, PAWN, WHITE_COLOR } from "../constants/Chess";
import { ChessPiece } from "../models/ChessPiece";
import { Position } from "../models/Position";

export const calculatePossibleMoves = (
  piece: ChessPiece,
  playerColor: string,
  opponentColor: string,
  board: ChessPiece[]
): Position[] => {
  const possibleMoves: { x: number; y: number }[] = [];

  switch (piece.type) {
    case PAWN:
      if (piece.color === WHITE_COLOR) {
        possibleMoves.push({ x: piece.x, y: piece.y + 1 });

        if (piece.y === 1) {
          possibleMoves.push({ x: piece.x, y: piece.y + 2 });
        }
      } else if (piece.color === BLACK_COLOR) {
        possibleMoves.push({ x: piece.x, y: piece.y - 1 });

        if (piece.y === 6) {
          possibleMoves.push({ x: piece.x, y: piece.y - 2 });
        }
      }
      break;
  }

  return possibleMoves;
};
