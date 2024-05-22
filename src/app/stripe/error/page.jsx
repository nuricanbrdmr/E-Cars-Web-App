"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BsBagXFill } from "react-icons/bs";
import CustomButtom from "@/components/custombuttom/custombuttom";
import Image from "next/image";
import { useEffect, useState } from "react";

function generateShortId(length) {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((b) => b.toString(36))
    .join('')
    .substring(0, length);
}

function ErrorPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [orderNumber, setOrderNumber] = useState('');
  const username =
    sessionStatus === "authenticated"
      ? session.user?.email?.substring(0, session.user?.email?.indexOf("@"))
      : "guest";

  useEffect(() => {
    document.title = "Failed Payment - E-Cars";
    const generatedOrderNumber = generateShortId(8);
    setOrderNumber(generatedOrderNumber);
    
    const fetchData = async () => {
      const storedCartGuest = localStorage.getItem(username + "_cart");
      const storedCartData = JSON.parse(storedCartGuest);
      const cartData = Object.values(storedCartData.cartDetails);

      if (storedCartGuest && username !== "guest") {
        try {
          const response = await fetch('/api/saveOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartData, orderNumber: generatedOrderNumber, state: false }),
          });
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchData();
  }, [username]);

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
    <section className="bg-slate-100 flex justify-center items-center h-screen">
      <div className="bg-white shadow-md py-7 px-10 w-96 h-72 rounded-md flex flex-col gap-3 items-center ">
        <span><BsBagXFill className="text-red-600 text-5xl" /></span>
        <div className="text-center pt-7">
          <h4 className="mb-1">Payment Failed</h4>
          {orderNumber && <p className="font-semibold">Order #{orderNumber}</p>}
          <span className="text-[14px] text-gray-400">Please try again!</span>
        </div>
        <Link href={"/"}>
          <CustomButtom
            title="Try Again"
            containerStyles="btn bg-red-600 rounded-lg mt-4"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
          />
        </Link>
      </div>
    </section>
  );
}

export default ErrorPage;
