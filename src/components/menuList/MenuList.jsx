import { useEffect, useState } from "react";
import axios from "axios";
import "./menuList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Basket from "../basket/Basket";
function MenuList({ showBasket, setShowBasket, addToBasket, getMenuList }) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get("https://misho.pythonanywhere.com/api/store/products")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      <Basket
        setShowBasket={setShowBasket}
        showBasket={showBasket}
        getMenuList={getMenuList}
      />

      <div className="menuListContainer">
        <div className="menuContent">
          {menu?.results?.map((data) => (
            <div className="menuCard" key={data.id}>
              <div className="productInfo">
                {" "}
                <img src={data.image} alt={data.name} />
                <p>{data.name}</p>
              </div>
              <div className="productPrice">
                <span>{data.price} ₾</span>
              </div>
              <div className="productOrder">
                <button className="order" onClick={() => addToBasket(data)}>
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ paddingRight: "10px" }}
                  />
                  დამატება
                </button>
                <button className="detailedInfo">დეტალურად</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuList;
