import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import axios from "axios";
import "./AboutUs.css";
function AboutUs() {
  const [video, setVideo] = useState([]);
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
      <Header />
      <div className="aboutUsContainer">
        {" "}
        {video.map((videoSource, index) => (
          <video key={index} width="300" height="300" controls>
            <source src={videoSource.video_file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </>
  );
}

export default AboutUs;
