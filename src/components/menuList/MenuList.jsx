import { useEffect, useState } from "react";
import axios from "axios";
import "./menuList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Basket from "../basket/Basket";
function MenuList({ showBasket, setShowBasket }) {
  const [menu, setMenu] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("https://misho.pythonanywhere.com/api/store/products")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);
  const addToBasket = async (element) => {
    const sessionId = sessionStorage.getItem("session_id");
    const orderedProduct = {
      product: element.id,
      quantity: 10,
    };
    try {
      const response = await fetch(
        "https://misho.pythonanywhere.com/api/order/cart/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
          body: JSON.stringify(orderedProduct),
        }
      );
      // const responseText = await response.text();
      // console.log("POST response:", response.status, responseText);

      // if (!response.ok) return;
    } catch (error) {
      console.log("არ გაიგზავნა", error);
    }
  };
  const getMenuList = async () => {
    const sessionId = sessionStorage.getItem("session_id");
    try {
      const response = await fetch(
        "https://misho.pythonanywhere.com/api/order/cart/",
        {
          method: "GET",
          headers: {
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setProduct(data);
      if (!response.ok) return;
    } catch (error) {
      console.log("Error get fetched menu list:", error);
    }
  };

  return (
    <div>
      <Basket
        product={product}
        setShowBasket={setShowBasket}
        getMenuList={getMenuList}
        showBasket={showBasket}
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
