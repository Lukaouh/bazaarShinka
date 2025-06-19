import React from "react";
import "./popUp.css";

function DetailInfo({ selectedProduct, setIngredientsPopUp }) {
  return (
    <div className="ingredientsContainer">
      <div className="popup-content ">
        <h1>{selectedProduct.name}</h1>
      </div>
    </div>
  );
}

export default DetailInfo;
