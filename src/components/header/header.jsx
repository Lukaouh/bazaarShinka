import "./header.css";
import companyLogo from "../../assets/images/companyLogo.png";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { useBasket } from "../../context/basketLengthContext";
function header({ setShowBasket, setMobHeader }) {
  const { basketLength, setBasketLength } = useBasket();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const showBasketContent = () => {
    setShowBasket(true);
  };
  const showMobileHeader = () => {
    setMobHeader(true);
  };
  return (
    <div className="MainContainer">
      <div className="headerContainer">
        <img src={companyLogo} alt="companyLogo"></img>
        <div className="routesContainer">
          <div className="PageToAbout">
            <Link to="/" className={isActive("/") ? "link" : "Activelink"}>
              ჩვენს შესახებ
            </Link>
          </div>
          <div className="pageToMenu">
            <Link
              to="/Menu"
              className={isActive("/Menu") ? "link" : "Activelink"}
            >
              მენიუ
            </Link>
          </div>
        </div>
        <div className="contactContainer">
          <p>+995 599 00 11 99</p>
          <div className="basketIcon">
            <button onClick={showBasketContent}>
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            <button className="burgerMenuButton" onClick={showMobileHeader}>
              <FontAwesomeIcon
                icon={faBars}
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            <div className="arrayLength">
              <span>{basketLength ? basketLength : 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default header;
