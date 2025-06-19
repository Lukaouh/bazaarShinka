import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import axios from "axios";
import "./menu.css";
import MenuList from "../../components/menuList/MenuList";
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
  const { productList, setProductList } = useBasket();
  const [filter, setFilter] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const getDifferentCategoriesProduct = async () => {
      try {
        const response = await axios.get(
          `https://misho.pythonanywhere.com/api/store/filter/products/?search=${filter}`
        );
        if (response.status >= 200 && response.status < 300) {
          setMenu(response.data);
        }
      } catch (error) {
        console.log("producti ar moidzebna", error);
      }
    };

    getDifferentCategoriesProduct();
  }, [filter]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://misho.pythonanywhere.com/api/store/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
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

      setProductList(data);
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
      <Header setShowBasket={setShowBasket} setMobHeader={setMobHeader} />
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
                  {category.id === activeList &&
                    category.children.map((data, index) => (
                      <div key={index}>
                        <button onClick={() => setFilter(data)}>{data}</button>
                      </div>
                    ))}
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
            menu={menu}
            getMenuList={getMenuList}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Menu;
