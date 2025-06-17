import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import axios from "axios";
import "./menu.css";
import MenuList from "../../components/MenuList/MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ResponsiveHeader from "../../components/responsiveHeader/responsiveHeader";
import Footer from "../../components/footer/footer";
import { useBasket } from "../../context/basketLengthContext";
function Menu({}) {
  const [categories, setCategories] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [showBasket, setShowBasket] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [mobHeader, setMobHeader] = useState(false);
  const [product, setProduct] = useState([]);
  const { basketLength, setBasketLength } = useBasket();

  useEffect(() => {
    const response = axios
      .get("https://misho.pythonanywhere.com/api/store/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const showActiveList = (ID) => {
    if (ID === activeList) {
      setActiveList(null);
    } else {
      setActiveList(ID);
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

      if (!response.ok) {
        console.error("Failed to fetch menu list");
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("cart_data", JSON.stringify(data));
      setProduct(data);
      setBasketLength(data?.items?.length);
    } catch (error) {}
  };
  const addToBasket = async (element) => {
    const sessionId = sessionStorage.getItem("session_id");
    const orderedProduct = {
      product: element.id,
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

      const data = await response.json();

      if (!sessionId && data.session_id) {
        sessionStorage.setItem("session_id", data.session_id);
      }

      sessionStorage.setItem("cart_data", JSON.stringify(data));
    } catch (error) {}
    getMenuList();
  };

  return (
    <>
      <Header
        setShowBasket={setShowBasket}
        setMobHeader={setMobHeader}
        mobHeader={mobHeader}
      />
      <ResponsiveHeader mobHeader={mobHeader} setMobHeader={setMobHeader} />
      <div className="menuContainer">
        <div className="content">
          <div className="categoriContent">
            <div className="category">
              {" "}
              <h2>კატეგორიები </h2>
              <button
                onClick={() => setShowCategory(!showCategory)}
                className="showCategoryBtn"
              >
                {" "}
                <FontAwesomeIcon
                  icon={showCategory ? faArrowUp : faArrowDown}
                />{" "}
              </button>
            </div>

            {categories.map((category) => (
              <div
                className={`mainContent ${
                  showCategory ? "contentShow" : "contentHide"
                }`}
                key={category.id}
              >
                <div className="categoryNames" style={{ display: "flex" }}>
                  <span>{category.name}</span>
                  <button onClick={() => showActiveList(category.id)}>+</button>
                </div>

                <div
                  className={`childrenContainer ${
                    category.id === activeList ? "expanded" : "collapsed"
                  }`}
                >
                  <ul>
                    {category.id === activeList &&
                      category.children.map((data, index) => (
                        <li key={index}>{data}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="menuComponent">
          {" "}
          <MenuList
            showBasket={showBasket}
            setShowBasket={setShowBasket}
            addToBasket={addToBasket}
            getMenuList={getMenuList}
            product={product}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Menu;
