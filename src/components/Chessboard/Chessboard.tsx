import { useEffect, useState } from "react";
import {
  BISHOP,
  BLACK_COLOR,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
  WHITE_COLOR,
} from "../../constants/Chess";
import { ChessPiece } from "../../models/ChessPiece";
import { Position } from "../../models/Position";
import { calculatePosition } from "../../utils/calculatePosition";
import { calculatePossibleMoves } from "../../utils/calculatePossibleMoves";
import Piece from "../Piece/Piece";
import "./Chessboard.css";
const Chessboard = ({ pieceColor = WHITE_COLOR, dimension = 8 }) => {
  const [chessboard, setChessboard] = useState<ChessPiece[]>([]);
  const [selected, setSelected] = useState<ChessPiece | null>(null);
  const [marksToPossibleMoves, setMarksToPossibleMoves] = useState<Position[]>(
    []
  );
  const opponentColor = pieceColor === BLACK_COLOR ? WHITE_COLOR : BLACK_COLOR;

  const setupChessboard = () => {
    const chessboard: ChessPiece[] = [];
    const playerColor = pieceColor;

    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        // If it's the first or last row

        const detailsPawns = {
          color: i === 1 ? opponentColor : playerColor,
          x: playerColor === WHITE_COLOR ? j : dimension - (j + 1),
          y: playerColor === WHITE_COLOR ? dimension - (i + 1) : i,
        };

        if (i === 0 || i === dimension - 1) {
          // Then, set up the major pieces
          // X === J, Y === I
          const detailsMajorPieces = {
            color: i === 0 ? opponentColor : playerColor,
            x: playerColor === WHITE_COLOR ? j : dimension - (j + 1),
            y: playerColor === WHITE_COLOR ? dimension - (i + 1) : i,
          };

          if (j === 0 || j === dimension - 1) {
            chessboard.push({
              type: ROOK,
              ...detailsMajorPieces,
            });
          } else if (j === 1 || j === dimension - 2) {
            chessboard.push({
              type: KNIGHT,
              ...detailsMajorPieces,
            });
          } else if (j === 2 || j === dimension - 3) {
            chessboard.push({
              type: BISHOP,
              ...detailsMajorPieces,
            });
          } else if (j === 3) {
            chessboard.push({
              type: playerColor === WHITE_COLOR ? QUEEN : KING,
              ...detailsMajorPieces,
            });
          } else if (j === 4) {
            chessboard.push({
              type: playerColor === BLACK_COLOR ? QUEEN : KING,
              ...detailsMajorPieces,
            });
          }
        }
        if (i === 1 || i === dimension - 2) {
          chessboard.push({
            type: PAWN,
            ...detailsPawns,
          });
        }
      }
    }

    setChessboard(chessboard);
  };

  const comparePieces = (piece1: ChessPiece | null, piece2: ChessPiece) => {
    if (!piece1) {
      return false;
    }
    return (
      piece1.x === piece2.x &&
      piece1.y === piece2.y &&
      piece1.color === piece2.color &&
      piece1.type === piece2.type
    );
  };

  useEffect(() => {
    setupChessboard();
  }, [pieceColor]);

  const handleSelectPiece = (piece: ChessPiece) => {
    setSelected(piece);
    const possibleMoves = calculatePossibleMoves(
      piece,
      pieceColor,
      opponentColor,
      chessboard
    );

    const marksToPossibleMoves = possibleMoves.map((move: Position) => {
      const position: Position = calculatePosition(pieceColor, move.x, move.y);
      return {
        x: position.x * 2 + 50,
        y: position.y * 2 + 50,
      };
    });

    setMarksToPossibleMoves(marksToPossibleMoves);
  };

  return (
    <div className="chessboard">
      {marksToPossibleMoves.map((mark, index) => (
        <div
          key={index}
          className="mark"
          style={{ transform: `translate(${mark.x}%, ${mark.y}%)` }}
        ></div>
      ))}
      <svg viewBox="0 0 100 100" className="coordinates">
        <text x="0.75" y="3.5" fontSize="2.8" className="coordinate-light">
          {pieceColor === WHITE_COLOR ? "8" : "1"}
        </text>
        <text x="0.75" y="15.75" fontSize="2.8" className="coordinate-dark">
          {pieceColor === WHITE_COLOR ? "7" : "2"}
        </text>
        <text x="0.75" y="28.25" fontSize="2.8" className="coordinate-light">
          {pieceColor === WHITE_COLOR ? "6" : "3"}
        </text>
        <text x="0.75" y="40.75" fontSize="2.8" className="coordinate-dark">
          {pieceColor === WHITE_COLOR ? "5" : "4"}
        </text>
        <text x="0.75" y="53.25" fontSize="2.8" className="coordinate-light">
          {pieceColor === WHITE_COLOR ? "4" : "5"}
        </text>
        <text x="0.75" y="65.75" fontSize="2.8" className="coordinate-dark">
          {pieceColor === WHITE_COLOR ? "3" : "6"}
        </text>
        <text x="0.75" y="78.25" fontSize="2.8" className="coordinate-light">
          {pieceColor === WHITE_COLOR ? "2" : "7"}
        </text>
        <text x="0.75" y="90.75" fontSize="2.8" className="coordinate-dark">
          {pieceColor === WHITE_COLOR ? "1" : "8"}
        </text>
        <text x="10" y="99" fontSize="2.8" className="coordinate-dark">
          {pieceColor === WHITE_COLOR ? "a" : "h"}
        </text>
        <text x="22.5" y="99" fontSize="2.8" className="coordinate-light">
          {pieceColor === WHITE_COLOR ? "b" : "g"}
        </text>
        <text x="35" y="99" fontSize="2.8" className="coordinate-dark">
          {pieceColor === WHITE_COLOR ? "c" : "f"}
        </text>
        <text x="47.5" y="99" fontSize="2.8" className="coordinate-light">
          {pieceColor === WHITE_COLOR ? "d" : "e"}
        </text>
        <text x="60" y="99" fontSize="2.8" className="coordinate-dark">
          {pieceColor === WHITE_COLOR ? "e" : "d"}
        </text>
        <text x="72.5" y="99" fontSize="2.8" className="coordinate-light">
          {pieceColor === WHITE_COLOR ? "f" : "c"}
        </text>
        <text x="85" y="99" fontSize="2.8" className="coordinate-dark">
          {pieceColor === WHITE_COLOR ? "g" : "b"}
        </text>
        <text x="97.5" y="99" fontSize="2.8" className="coordinate-light">
          {pieceColor === WHITE_COLOR ? "h" : "a"}
        </text>
      </svg>
      {chessboard.map((piece, index) => {
        return (
          <Piece
            selected={comparePieces(selected, piece)}
            onSelect={handleSelectPiece}
            piece={piece}
            key={index}
            playerColor={pieceColor}
          ></Piece>
        );
      })}
    </div>
  );
};

export default Chessboard;
