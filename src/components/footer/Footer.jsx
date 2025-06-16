import "./footer.css";
import shinka from "../../assets/images/shinka.png";
import { Link } from "react-router-dom";
function footer() {
  return (
    <div className="footerContainer">
      <div className="footerHead">
        <div className="footerHeadComponents">
          {" "}
          <div className="component1">
            <img src={shinka} alt="shinkaLogo" />
            <p>
              ხარისხიანი პროდუქტი, სანდო მომსახურება – თქვენი ყოველდღიური
              არჩევანი ხილ-ბოსტნეულსა და ნახევარფაბრიკატებში.
            </p>
          </div>
          <div className="component">
            <Link to="/" className="page">
              ჩვენს შესახებ
            </Link>
            <Link to="/menu" className="page">
              პროდუქტები
            </Link>
          </div>
          <div className="component">
            <span>საკონტაქტო ინფორმაცია</span>
            <span>+995 551 77 88 99</span>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <div className="footerBottomComponents">
          <div className="bottomComp">
            <span>© 2025, All Rights Reserved.</span>
          </div>
          <div className="bottomComp">
            {" "}
            <span>© 2025, All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default footer;
