import React from "react";
import "./popUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
function DetailInfo({ selectedProduct, setIngredientsPopUp }) {
  return (
    <div className="ingredientsContainer">
      <div className="popup-content ">
        <div className="popUpImage">
          <img src={selectedProduct.image}></img>
        </div>
        <div className="popUpHead">
          {" "}
          <h6>{selectedProduct.name}</h6>
          <ol>
            <li>ხორცი</li>
            <li>მწვანილი</li>
            <li>ფქვილი</li>
          </ol>
        </div>
        <div className="closePopUp">
          {" "}
          <button
            onClick={() => {
              setIngredientsPopUp(false);
            }}
          >
            <FontAwesomeIcon icon={faX} className="closeHeader" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailInfo;
