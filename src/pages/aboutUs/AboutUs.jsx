import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import axios from "axios";
import "./AboutUs.css";
import ResponsiveHeader from "../../components/responsiveHeader/responsiveHeader";
import Footer from "../../components/footer/footer";
function AboutUs() {
  const [video, setVideo] = useState([]);
  const [mobHeader, setMobHeader] = useState(false);
  useEffect(() => {
    const response = axios
      .get("https://misho.pythonanywhere.com/api/store/videos/")
      .then((response) => {
        setVideo(response.data);
      })
      .catch((error) => {
        console.log("error gvak dzmebo");
      });
  }, []);

  return (
    <>
      <Header mobHeader={mobHeader} setMobHeader={setMobHeader} />
      <ResponsiveHeader mobHeader={mobHeader} setMobHeader={setMobHeader} />
      <div className="aboutUsContainer">
        {" "}
        {video.map((videoSource, index) => (
          <video key={index} width="300" height="300" controls>
            <source src={videoSource.video_file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
