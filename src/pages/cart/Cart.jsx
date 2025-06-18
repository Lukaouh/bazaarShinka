import "./cart.css";
import Header from "../../components/header/header";
import ResponsiveHeader from "../../components/responsiveHeader/responsiveHeader";
import { useState } from "react";
import { useBasket } from "../../context/basketLengthContext";
import Product from "../../components/cartProduct/Product";
import ContactForm from "../../components/contactInfo/ContactForm";
function Cart() {
  const [mobHeader, setMobHeader] = useState(false);
  const { productList, setProductList } = useBasket();

  return (
    <>
      <Header setMobHeader={setMobHeader} />
      <ResponsiveHeader setMobHeader={setMobHeader} mobHeader={mobHeader} />
      <div style={{ padding: "0 24px" }}>
        {" "}
        <Product />
      </div>
      <div className="contactForDesktopResolution">
        {" "}
        <ContactForm />
      </div>
    </>
  );
}

export default Cart;
