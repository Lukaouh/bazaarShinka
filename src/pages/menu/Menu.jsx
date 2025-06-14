import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import axios from "axios";
import "./menu.css";
import MenuList from "../../components/MenuList/MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
function Menu() {
  const [categories, setCategories] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [showBasket, setShowBasket] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
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
  return (
    <>
      <Header setShowBasket={setShowBasket} />
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
          <MenuList showBasket={showBasket} setShowBasket={setShowBasket} />
        </div>
      </div>
    </>
  );
}

export default Menu;
