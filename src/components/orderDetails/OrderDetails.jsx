import "./orderDetails.css";
import { useBasket } from "../../context/basketLengthContext";

function OrderDetails({
  totalPrice,
  deliverPrice,
  setProductQuantity,
  productQuantity,
  pay,
}) {
  const { productList, setProductList } = useBasket();

  const total = Number(totalPrice) + Number(deliverPrice);
  const sum = total.toFixed(1);
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

      if (!response.ok) {
        console.error("Failed to fetch menu list");
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("cart_data", JSON.stringify(data));

      setProductList(data);
    } catch (error) {}
  };
  const goToCart = async () => {
    const sessionId = sessionStorage.getItem("session_id");
    const updateOrderData = productList?.items.map((item) => {
      console.log(productQuantity[item.product], "orderList");
      return {
        product: item.product,
        quantity: productQuantity[item.product] ?? item.quantity,
      };
    });
    try {
      const response = await fetch(
        "https://misho.pythonanywhere.com/api/order/cart/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
          body: JSON.stringify(updateOrderData),
        }
      );

      const data = await response.json();

      if (!sessionId && data.session_id) {
        sessionStorage.setItem("session_id", data.session_id);
      }

      sessionStorage.setItem("cart_data", JSON.stringify(data));
    } catch (error) {
      console.error("Cart update failed:", error);
    }

    getMenuList();
    navigate("/cart");
  };
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
      <div className="orderDetails">
        {" "}
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
          <button onClick={() => pay()}>შეკვეთის გაფორმება</button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
