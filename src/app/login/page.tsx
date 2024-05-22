"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi"; // Show/Hide icons
import styles from "@/app/api/auth.module.css";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { data: session, status: sessionStatus } = useSession();
  
  useEffect(() => {
    document.title = "Log In - E-Cars";
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  const handleForgotMyPassword = () => {
    router.push("/forgotPassword");
  };

  if (sessionStatus === "loading") {
    return (
      <div className="loader">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Image
            src={"/ecar_logo.png"}
            alt="ecars-logo"
            width={400}
            height={400}
          />
        </div>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
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
                Streamline your car rental experience with our effortless
                booking process.
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
                  Streamline your car rental experience with our effortless
                  booking process.
                </p>
              </div>

              <div className={styles.auth_container}>
                <div className="flex justify-center">
                  <div className={styles.auth_formDiv}>
                    <h2 className="text-black text-5xl mb-8 font-semibold">
                      Login
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className={styles.auth_input}
                        placeholder="Email"
                        required
                      />
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={styles.auth_input}
                          placeholder="Password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                        >
                          {showPassword ? <BiShow /> : <BiHide />}
                        </button>
                      </div>
                      <button type="submit" className={styles.auth_submit}>
                        {" "}
                        Sign In
                      </button>
                      <p className="text-red-600 text-[16px] mb-4">
                        {error && error}
                      </p>
                    </form>

                    <div className="text-right">
                      <button
                        onClick={handleForgotMyPassword}
                        className="text-neutral-600 mt-2 cursor-pointer hover:underline transition"
                      >
                        Forgot My Password
                      </button>
                    </div>

                    <div className="flex flex-row items-center gap-4 mt-10 justify-center">
                      <button
                        className="bg-white flex text-black w-12 h-12 rounded-full items-center text-center cursor-pointer justify-center"
                        onClick={() => {
                          signIn("github");
                        }}
                      >
                        <FaGithub size={30}></FaGithub>
                      </button>

                      <button
                        className="bg-white flex text-center w-12 h-12 rounded-full items-center cursor-pointer justify-center"
                        onClick={() => {
                          signIn("google");
                        }}
                      >
                        <FaGoogle
                          size={30}
                          style={{ color: "#4285F4" }}
                        ></FaGoogle>
                      </button>
                    </div>

                    <div className="text-left">
                      <p className="text-neutral-600 mt-12">
                        Don&apos;t have an account?
                        <Link
                          className="text-black ml-2 cursor-pointer hover:underline transition"
                          href="/register"
                        >
                          Create an account
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    )
  );
};

export default Login;
