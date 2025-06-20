import React from "react";
import "./product.css";
import { useBasket } from "../../context/basketLengthContext";
import { useState } from "react";

import PriceBtn from "../priceBtn/PriceBtn";
function Product({ productQuantity, setProductQuantity }) {
  const { productList, setProductList } = useBasket();
  const [deliverPrice, setDeliverPrice] = useState(0);

  const handleChange = (data, newValue) => {
    setProductQuantity((prevValue) => ({
      ...prevValue,
      [data.product]: Math.max(newValue, Number(data.second_quantity)),
    }));
  };
  const totalPrice = productList?.items
    ?.reduce((acc, item) => {
      if (productQuantity[item.product] !== undefined) {
        return acc + item.product_price * productQuantity[item.product];
      } else {
        return acc + item.total_price;
      }
    }, 0)
    .toFixed(1);

  return (
    <>
      <div className="cartContainer">
        <div className="productContainer">
          <span>კალათაში {productList?.items?.length} პროდუქტია</span>
          <div className="choosenProduct">
            {productList?.items?.map((data, index) => (
              <div key={index}>
                {" "}
                <div className="mapeProductContainer" key={data.product}>
                  <div className="productImgAndName">
                    <img
                      src={`https://misho.pythonanywhere.com${data.product_image}`}
                      alt="product_img"
                    />
                    <span>{data.product_name}</span>{" "}
                  </div>
                  <div className="importedPriceBtnResponsive">
                    {" "}
                    <span>{data.product_name}</span>{" "}
                    <div>
                      <PriceBtn
                        productQuantity={productQuantity}
                        handleChange={handleChange}
                        data={data}
                        setProductQuantity={setProductQuantity}
                      />
                    </div>
                  </div>
                  <div className="importedPriceBtn">
                    {" "}
                    <PriceBtn
                      productQuantity={productQuantity}
                      handleChange={handleChange}
                      data={data}
                      setProductQuantity={setProductQuantity}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    background: "rgba(27, 27, 27, 0.05)",
                    height: "1px",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
