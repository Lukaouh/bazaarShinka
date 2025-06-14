import "./basket.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import bin from "../../assets/images/bin.png";
import { useEffect } from "react";

function Basket({ product, setShowBasket, getMenuList, showBasket }) {
  useEffect(() => {
    if (showBasket) {
      getMenuList();
    }
  }, [showBasket]);

  const removeProductFromBasket = async (element) => {
    const sessionId = sessionStorage.getItem("session_id");
    const removedProduct = {
      product: element.product,
    };

    try {
      const response = await fetch(
        "https://misho.pythonanywhere.com/api/order/remove-product/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
          body: JSON.stringify(removedProduct),
        }
      );
    } catch (error) {
      console.log(error);
    }

    getMenuList();
  };

  return (
    <div className={`basketContainer ${showBasket ? "basketShow" : ""}`}>
      <div className="basketContent">
        <div className="basketItems">
          <h3>კალათა</h3>
          <button
            onClick={() => {
              setShowBasket(false);
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <div>
          {product?.items?.map((data) => (
            <div className="mapedContainer" key={data.product}>
              <div className="basketMenuImg">
                {" "}
                <img
                  src={`https://misho.pythonanywhere.com${data.product_image}`}
                  alt="product_img"
                />
              </div>
              <div className="product">
                <div className="basketMenuName">
                  <span>{data.product_name}</span>
                  <button onClick={() => removeProductFromBasket(data)}>
                    <img src={bin} alt="bin" className="recycleBin" />
                  </button>
                </div>
                <div className="basketMenuPrice">
                  <span>{data.product_price} ₾</span>
                  <div className="basketMemuBtn">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {product?.items?.length > 0 ? (
          <div className="lastPriceAndOrder">
            <span>სულ : 2.5₾</span>
            <button>კალათის ნახვა</button>
          </div>
        ) : (
          <p className="emptyBasket">თქვენი კალათა ცარიელია</p>
        )}
      </div>
    </div>
  );
}

export default Basket;
