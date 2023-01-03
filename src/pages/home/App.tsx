import { useState } from "react";
import Chessboard from "../../components/Chessboard/Chessboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { WHITE_COLOR } from "../../constants/Chess";
import "./App.css";

function App() {
  const [playerColor, setPlayerColor] = useState<string>(WHITE_COLOR);

  const handleSelectColor = (event: any) => {
    setPlayerColor(event);
  };

  return (
    <div className="App">
      <Sidebar onSelectColor={handleSelectColor}></Sidebar>
      <Chessboard pieceColor={playerColor}></Chessboard>
    </div>
  );
}

export default App;
