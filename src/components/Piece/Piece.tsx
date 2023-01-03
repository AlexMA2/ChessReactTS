import { useEffect, useState } from "react";
import { BLACK_COLOR, WHITE_COLOR } from "../../constants/Chess";
import { ChessPiece } from "../../models/ChessPiece";
import { Position } from "../../models/Position";
import { calculatePosition } from "../../utils/calculatePosition";

import "./Piece.css";

function Piece({
  selected,
  piece,
  onSelect,
  playerColor,
}: {
  selected: boolean;
  piece: ChessPiece;
  onSelect: any;
  playerColor: string;
}) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const movePiece = (event: any, piece: ChessPiece) => {
    const opponentColor =
      playerColor === BLACK_COLOR ? WHITE_COLOR : BLACK_COLOR;
    if (event.button === 0) {
      onSelect(piece);
    }
  };

  useEffect(() => {
    const realPosition = calculatePosition(playerColor, piece.x, piece.y);
    setPosition(realPosition);
  }, [piece]);

  return (
    <div
      style={{
        backgroundImage: `url(${
          "/src/assets/themes/pieces/" +
          piece.color +
          piece.type.substring(0, 1).toLocaleLowerCase() +
          ".png"
        })`,
        transform: `translate(${position.x}%, ${position.y}%)`,
        backgroundColor: selected ? "red" : "transparent",
      }}
      onMouseDown={(e) => {
        movePiece(e, piece);
      }}
      className="piece"
    ></div>
  );
}

export default Piece;
