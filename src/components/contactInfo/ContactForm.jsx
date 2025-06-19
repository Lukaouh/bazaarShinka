import "./contactForm.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
function ContactInfo({ setDeliverPrice, deliverPrice }) {
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
  const streets = [
    {
      name: "ადგილიდან წაღება",
      price: 0,
    },
    {
      name: "დიღომი",
      price: 10,
    },
    {
      name: "ვაკე",
      price: 7,
    },
    {
      name: "საბურთალო",
      price: 5,
    },
    {
      name: "წყნეთი",
      price: 12,
    },
  ];

  const getDeliverPrice = (streetName) => {
    setSelectedOption(streetName);
    const selectedStreet = streets.find((street) => street.name === streetName);
    if (selectedStreet) {
      setDeliverPrice(selectedStreet.price);
    }
  };

  return <></>;
}

export default ContactInfo;
