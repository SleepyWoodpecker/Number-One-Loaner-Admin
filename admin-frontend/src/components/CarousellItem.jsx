import React from "react";
import "../Carousell.css";

function CaoursellItem({ children, style }) {
  return (
    <div style={{ width: "100%" }} id="carousell-item">
      <div>{children}</div>
    </div>
  );
}

export default CaoursellItem;
