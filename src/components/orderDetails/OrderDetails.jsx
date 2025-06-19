import "./orderDetails.css";
import { useBasket } from "../../context/basketLengthContext";

function OrderDetails({ totalPrice, deliverPrice }) {
  const { productList, setProductList } = useBasket();

  const total = Number(totalPrice) + Number(deliverPrice);
  const sum = total.toFixed(1);

  return (
    <div className="orderDetailsContainer">
      <div className="orderDetailsHead">
        <span>შეკვეთის დეტალები</span>
      </div>
      <div
        style={{
          width: "100%",
          background: "rgba(27, 27, 27, 0.05)",
          height: "1px",
        }}
      ></div>
      <div className="orderInfo">
        <span>პროდუქტები ({productList?.items?.length}) </span>
        <span>{totalPrice} ₾</span>
      </div>
      <div className="orderInfo">
        <span>მიტანის საფასური </span>
        <span> {deliverPrice} ₾</span>
      </div>
      <div className="orderInfoPrice">
        <span>ჯამი </span>
        <span> {sum} ₾</span>
      </div>
      <div className="orderButton">
        <button>შეკვეთის გაფორმება</button>
      </div>
    </div>
  );
}

export default OrderDetails;
