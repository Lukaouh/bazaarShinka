import "./responsiveHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
function responsiveHeader({ mobHeader, setMobHeader }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div className={`mobHeaderContainer ${mobHeader ? "showMobHeader" : ""}`}>
      <div className="mobHeaderItems">
        <div className="mobHeaderLinks">
          <div className="PageToAbout">
            <Link to="/" className={isActive("/") ? "nonActive" : "isActive"}>
              ჩვენს შესახებ
            </Link>
          </div>
          <div className="pageToMenu">
            <Link
              to="/Menu"
              className={isActive("/Menu") ? "nonActive" : "isActive"}
            >
              მენიუ
            </Link>
          </div>
        </div>
        <div className="closeMobHeader">
          {" "}
          <button
            onClick={() => {
              setMobHeader(false);
            }}
          >
            <FontAwesomeIcon icon={faX} className="closeHeader" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default responsiveHeader;
