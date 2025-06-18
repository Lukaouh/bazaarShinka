import "./contactForm.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
function ContactInfo() {
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

  return (
    <div className="contactFormContainer">
      <div className="contactFormContent">
        <form className="formContainer">
          <div className="contactHead">
            <span>საკონტაქტო ინფორმაცია</span>
          </div>
          <span>მისამართი</span>
          <div className="address">
            <input type="text" name="address" {...register("address")}></input>
            {errors.first_name && <p>{errors.first_name.message}</p>}
          </div>
          <div className="address">
            <input type="text" name="address" {...register("address")}></input>
          </div>
          <span>პირადი ინფორმაცია</span>
          <div className="personalInfoInputs">
            {" "}
            <div className="name">
              <input
                type="text"
                name="address"
                {...register("address")}
              ></input>
            </div>
            <div className="phone">
              <input
                type="text"
                name="address"
                {...register("address")}
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactInfo;
