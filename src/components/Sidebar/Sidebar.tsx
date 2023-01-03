import { BLACK_COLOR, WHITE_COLOR } from "../../constants/Chess";
import Button from "../Button/Button";

function Sidebar({
  onSelectColor,
}: {
  onSelectColor: (color: string) => void;
}) {
  return (
    <div>
      <Button
        onClick={() => {
          onSelectColor(BLACK_COLOR);
        }}
        label="Choose Black Color"
      ></Button>
      <Button
        onClick={() => {
          onSelectColor(WHITE_COLOR);
        }}
        label="Choose White Color"
      ></Button>
    </div>
  );
}

export default Sidebar;
