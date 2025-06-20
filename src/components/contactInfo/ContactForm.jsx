import "./contactForm.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";
function ContactInfo({
  setDeliverData,
  deliverData,
  setDeliverPrice,
  deliverPrice,
  setSelectedZoneId,
}) {
  const [selectedOption, setSelectedOption] = useState();
  const schema = yup.object({
    first_name: yup.string().required("Field is empty"),
    phone: yup.string().required("Field is empty"),
    addres: yup.string().required("Field is empty"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "https://misho.pythonanywhere.com/api/order/address/"
        );
        setDeliverData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddresses();
  }, []);

  const getDeliverPrice = (streetName) => {
    setSelectedOption(streetName);
    console.log(selectedOption);

    const selectedStreet = deliverData.find(
      (street) => street.name === streetName
    );
    if (selectedStreet) {
      setDeliverPrice(selectedStreet.price);
      setSelectedZoneId(selectedStreet.id);
    }
  };

  return (
    <div className="contactFormContainer">
      <div className="contactContent">
        <form className="contactForm">
          {" "}
          <div className="adrress">
            {" "}
            <select
              value={selectedOption}
              onChange={(e) => getDeliverPrice(e.target.value)}
            >
              {deliverData.map((data, index) => (
                <option key={index} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="adrress">
            <input></input>
          </div>
          <div className="personalInfo">
            <div className="name">
              <input></input>
            </div>
            <div className="phone">
              <input></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ContactInfo;
