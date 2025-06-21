import "./cart.css";
import Header from "../../components/header/header";
import ResponsiveHeader from "../../components/responsiveHeader/responsiveHeader";
import { useState } from "react";
import { useBasket } from "../../context/basketLengthContext";
import Product from "../../components/cartProduct/Product";
import ContactForm from "../../components/contactInfo/ContactForm";
// import OrderDetails from "../../components/OrderDetails";
import OrderDetails from "../../components/orderDetails/OrderDetails";
import { Link } from "react-router-dom";
import { useRef } from "react";
function Cart() {
  const [mobHeader, setMobHeader] = useState(false);
  const [productQuantity, setProductQuantity] = useState({});
  const { productList, setProductList } = useBasket();
  const [deliverData, setDeliverData] = useState([]);
  const [deliverPrice, setDeliverPrice] = useState({
    price: 0,
    id: 0,
  });
  const formRef = useRef(null);

  const totalPrice = productList?.items
    ?.reduce((acc, item) => {
      if (productQuantity[item.product] !== undefined) {
        return acc + item.product_price * productQuantity[item.product];
      } else {
        return acc + item.total_price;
      }
    }, 0)
    .toFixed(1);
  const pay = async () => {
    const sessionId = sessionStorage.getItem("session_id");
    const res = await fetch(
      "https://misho.pythonanywhere.com/api/order/api/pay/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionId ? { "Session-ID": sessionId } : {}),
        },
        credentials: "include",
        body: JSON.stringify({
          delivery_zone_id: deliverPrice.id,
        }),
      }
    );

    const data = await res.json();
    sessionStorage.setItem("cart_data", JSON.stringify(data));

    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      alert("გადახდა ვერ დაიწყო");
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <Header setMobHeader={setMobHeader} />
      <ResponsiveHeader setMobHeader={setMobHeader} mobHeader={mobHeader} />
      {productList.items?.length > 0 ? (
        <div className="cartContainedBox">
          {" "}
          <div className="importedProductAndContact">
            {" "}
            <Product
              setProductQuantity={setProductQuantity}
              productQuantity={productQuantity}
              totalPrice={totalPrice}
            />{" "}
            <ContactForm
              className="contactContainerForMob"
              setDeliverData={setDeliverData}
              deliverData={deliverData}
              deliverPrice={deliverPrice}
              setDeliverPrice={setDeliverPrice}
              formRef={formRef}
            />
          </div>
          <div className="importedOrderList">
            {" "}
            <OrderDetails
              totalPrice={totalPrice}
              deliverPrice={deliverPrice}
              setProductQuantity={setProductQuantity}
              productQuantity={productQuantity}
              pay={pay}
              formRef={formRef}
            />
          </div>
        </div>
      ) : (
        <div className="cartIsEmpty">
          {" "}
          <p> თქვენი კალათა ცარიელი </p>
          <Link to="/menu" className="goForProduct">
            მენიუ
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
