"use client";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Registration({
  open,
  setOpen,
  setUserLoggedIn,
}: ModalOpen) {
  const [activeTab, setActiveTab] = useState("login");

  const handleClose = () => {
    setOpen(false);
    loginFormik.resetForm();
    registerFormik.resetForm();
    setActiveTab("login");
  };

  const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required("მომხმარებლის სახელი აუცილებელია"),
    password: Yup.string().required("პაროლი აუცილებელია"),
  });

  const registerValidationSchema = Yup.object().shape({
    identificationNumber: Yup.string().required(
      "საიდენტფიკაციო ნომერი აუცილებელია"
    ),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{9}$/, "ტელეფონის ნომერი უნდა იყოს 9 ციფრი")
      .required("ტელეფონის ნომერი აუცილებელია"),
    email: Yup.string()
      .email("არასწორი ელ-ფოსტა")
      .required("ელ-ფოსტა აუცილებელია"),
    userName: Yup.string().required("კომპანიის სახელი აუცილებელია"),
    password: Yup.string()
      .min(12, "პაროლი უნდა შეიცავდეს მინიმუმ 12 სიმბოლოს")
      .required("პაროლი აუცილებელია"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "პაროლები არ ემთხვევა")
      .required("პაროლის დადასტურება აუცილებელია"),
    agreeToTerms: Yup.bool().oneOf([true], "თქვენ უნდა დათანხმდეთ პირობებს"),
  });

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "https://localhost:44324/api/account/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        console.log("Login successful:", data);
        setUserLoggedIn(true);
        handleClose();

        if (typeof window !== "undefined") {
          localStorage.setItem("token", data);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      identificationNumber: "",
      phoneNumber: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "https://localhost:44324/api/account/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error("registration failed");
        }

        console.log("registration successful:");
        setUserLoggedIn(true);
        handleClose();
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <div className="bg-[#100c1c] text-white rounded-lg shadow-lg p-8 w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "login" ? "border-b-2 border-white" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            შესვლა
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "register" ? "border-b-2 border-white" : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            რეგისტრაცია
          </button>
        </div>
        {activeTab === "login" && (
          <form onSubmit={loginFormik.handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="კომპანიის სახელი"
                className="w-full p-2 rounded bg-input-bg "
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                value={loginFormik.values.username}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: "0.8px",
                }}
              />
              {loginFormik.touched.username && loginFormik.errors.username && (
                <div className="text-red-500">
                  {loginFormik.errors.username}
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="პაროლი"
                className="w-full p-2 rounded bg-input-bg "
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                value={loginFormik.values.password}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: "0.8px",
                }}
              />
              {loginFormik.touched.password && loginFormik.errors.password && (
                <div className="text-red-500">
                  {loginFormik.errors.password}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#6A80EA] rounded mt-4"
            >
              შესვლა
            </button>
          </form>
        )}

        {activeTab === "register" && (
          <form
            onSubmit={registerFormik.handleSubmit}
            className="overflow-auto"
          >
            <div className="mb-4">
              <input
                type="text"
                name="identificationNumber"
                placeholder="საიდენტფიკაციო ნომერი"
                className="w-full p-2 rounded bg-input-bg "
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.identificationNumber}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: "0.8px",
                }}
              />
              {registerFormik.touched.identificationNumber &&
                registerFormik.errors.identificationNumber && (
                  <div className="text-red-500">
                    {registerFormik.errors.identificationNumber}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="phoneNumber"
                placeholder="ტელეფონის ნომერი"
                className="w-full p-2 rounded bg-input-bg "
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.phoneNumber}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: "0.8px",
                }}
              />
              {registerFormik.touched.phoneNumber &&
                registerFormik.errors.phoneNumber && (
                  <div className="text-red-500">
                    {registerFormik.errors.phoneNumber}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="ელ-ფოსტა"
                className="w-full p-2 rounded bg-input-bg "
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.email}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: "0.8px",
                }}
              />
              {registerFormik.touched.email && registerFormik.errors.email && (
                <div className="text-red-500">
                  {registerFormik.errors.email}
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="userName"
                placeholder="კომპანიის სახელი"
                className="w-full p-2 rounded bg-input-bg "
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.userName}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: "0.8px",
                }}
              />
              {registerFormik.touched.userName &&
                registerFormik.errors.userName && (
                  <div className="text-red-500">
                    {registerFormik.errors.userName}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="პაროლი"
                className="w-full p-2 rounded bg-input-bg "
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.password}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: "0.8px",
                }}
              />
              {registerFormik.touched.password &&
                registerFormik.errors.password && (
                  <div className="text-red-500">
                    {registerFormik.errors.password}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="დაადასტურე პაროლი"
                className="w-full p-2 rounded bg-input-bg "
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.confirmPassword}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: "0.8px",
                }}
              />
              {registerFormik.touched.confirmPassword &&
                registerFormik.errors.confirmPassword && (
                  <div className="text-red-500">
                    {registerFormik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="agreeToTerms"
                className="mr-2"
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                checked={registerFormik.values.agreeToTerms}
              />
              <label className="block">
                ვეთანხმები გამოყენების პირობებს და კონფიდენციალურობის პოლიტიკას
              </label>
            </div>
            {registerFormik.touched.agreeToTerms &&
              registerFormik.errors.agreeToTerms && (
                <div className="text-red-500">
                  {registerFormik.errors.agreeToTerms}
                </div>
              )}
            <button
              type="submit"
              className="w-full py-2 bg-[#6A80EA] rounded mt-4"
            >
              რეგისტრაცია
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
