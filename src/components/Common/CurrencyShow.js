import * as React from "react";
import { useSelector } from "react-redux";


// Used in House and Area components to show the currency symbol
export default function Price({ houseIndex }) {

    const symbol = useSelector((state) => state.houses.houses[houseIndex].cost.symbol);

    let symbolCharacter = symbol;
    switch (symbol) {
      case 0:symbolCharacter = "€";break;
      case 1:symbolCharacter = "$";break;
      case 2:symbolCharacter = "£";break;
      case 3:symbolCharacter = "¥";break;
      case 4:symbolCharacter = "₹";break;
      case 5:symbolCharacter = "₽";break;
      case 6:symbolCharacter = "ɱ";break;
      default:console.log(`Currency code ${symbol} does not exist`);
    }

    return (
        <span className="colorGray">
            {symbolCharacter}
        </span>
    )
}