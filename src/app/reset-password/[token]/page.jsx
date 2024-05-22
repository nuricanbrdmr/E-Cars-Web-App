"use client";
import { useState } from "react";
import styles from "@/app/api/auth.module.css";
import Image from "next/image";
import { updatePassword } from "./updatePassword";
import { useSession } from "next-auth/react";
import { BiShow, BiHide } from "react-icons/bi";

function ResetPasswordPage({ params }) {
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 8) {
      setMessage("Password must be longer than 8 characters.");
      return;
    }

    if (newPassword !== reenterPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      await updatePassword({ newPassword, token: params.token });
      console.log("Şifre başarıyla güncellendi.");
  } catch (error) {
      console.error("Şifre güncelleme hatası:", error);
      setMessage("An error occurred while updating password.");
  }
  
  }

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
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=870&q=80"
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
              Streamline your car rental experience with our effortless booking
              process.
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
                  <h2 className="text-black text-2xl mb-4">Change Password</h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={styles.auth_input}
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
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
                    <div className="relative mt-4">
                      <input
                        type={showReenterPassword ? "text" : "password"}
                        className={styles.auth_input}
                        placeholder="Confirm Password"
                        onChange={(e) => setReenterPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowReenterPassword(!showReenterPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                      >
                        {showReenterPassword ? <BiShow /> : <BiHide />}
                      </button>
                    </div>
                    <button type="submit" className={styles.auth_submit}>
                      Submit
                    </button>
                  </form>
                  {message && <p className="text-red-500 mt-4">{message}</p>}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default ResetPasswordPage;
