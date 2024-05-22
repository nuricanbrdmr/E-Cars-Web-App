"use client";
import React, { useState } from "react";
import styles from "@/app/api/auth.module.css";
import Image from "next/image";
import { mailAction } from "./mailAction";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resultValue, setResultValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await mailAction({ email });
    setResultValue(result.status);

    if (result.status === "success") {
      setMessage("Mail sent successfully. Please check your email.");
    } else {
      setMessage(result.message || "An error occurred. Please try again.");
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <Image
                className="bg-white rounded-full "
                src={"/icon-2.png"}
                alt=" "
                width={70}
                height={70}
              />
            </a>
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to E-CARS
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Streamline your car rental experience with our effortless booking process.
            </p>
          </div>
        </section>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <Image
                  className="bg-white rounded-full "
                  src={"/icon-2.png"}
                  alt=" "
                  width={70}
                  height={70}
                />
              </a>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to E-CARS
              </h1>
              <p className="mt-4 leading-relaxed text-gray-500">
                Streamline your car rental experience with our effortless booking process.
              </p>
            </div>
            <div className={styles.auth_container}>
              <div className="flex justify-center">
                <div className={styles.auth_formDiv}>
                  <h2 className="text-black text-2xl mb-4">
                    Input Email to Reset
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className={styles.auth_input}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className={styles.auth_submit}>
                      {" "}
                      Send
                    </button>
                  </form>
                  {message && resultValue === "success" ? (
                    <p className="text-green-500 mt-4">{message}</p>
                  ) : (
                    <p className="text-red-500 mt-4">{message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default ForgotPassword;
