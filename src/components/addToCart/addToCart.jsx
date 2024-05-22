"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const AddToCart = ({
  addItem,
  title,
  containerStyles,
  textStyles,
  rightIcon,
  name,
  currency,
  description,
  images,
  price,
  price_id,
  slug,
}) => {
  const { data: session, status: sessionStatus } = useSession();
  const username = sessionStatus === "authenticated" ? session.user?.email?.substring(0, session.user?.email?.indexOf("@")) : "guest";

  const carObject = {
    name: name,
    currency: currency,
    description: description,
    images: images,
    price: price,
    price_id: price_id,
    slug: slug,
    quantity: 1,
  };

  const notify = () =>
    toast.success(`${carObject.name} has been added to the cart`, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div>
      <motion.button
        initial={{ opacity: 0.9 }}
        whileHover={{ scale: 1.1, opacity: 1 }}
        disabled={false}
        className={`custom-btn ${containerStyles}`}
        onClick={() => {
          addItem(carObject, username);
          notify();
        }}
      >
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon && (
          <div className="relative w-4 h-4">
            <Image
              src={rightIcon}
              alt="right icon"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
            />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AddToCart;
