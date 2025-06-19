import "./cart.css";
import Header from "../../components/header/header";
import ResponsiveHeader from "../../components/responsiveHeader/responsiveHeader";
import { useState } from "react";
import { useBasket } from "../../context/basketLengthContext";
import Product from "../../components/cartProduct/Product";
import ContactForm from "../../components/contactInfo/ContactForm";
import { Link } from "react-router-dom";
function Cart() {
  const [mobHeader, setMobHeader] = useState(false);
  const { productList, setProductList } = useBasket();

  return (
    <>
      <Header setMobHeader={setMobHeader} />
      <ResponsiveHeader setMobHeader={setMobHeader} mobHeader={mobHeader} />
      {productList.items?.length > 0 ? (
        <div className="cartContainedddr">
          {" "}
          <Product />
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
    </>
  );
}

export default Cart;
