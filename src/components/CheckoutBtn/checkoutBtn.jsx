import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import Loader from './../Loader/loader';

const CheckoutBtn = ({ items, username }) => {
  const [loading, setLoading] = useState(false);

  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    }
    return stripePromise;
  }

  const checkoutOptions = {
    lineItems: items.map(item => ({
      price: item.price_id,
      quantity: item.quantity
    })),
    mode: "payment",
    successUrl: "http://localhost:3000/stripe/saveOrderDetails",
    cancelUrl: "http://localhost:3000/stripe/error",
  }

  const redirectToCheckout = async () => {
    console.log("redirectToCheckout");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("stripe checkout error", error);
  }

  const handleCheckout = async () => {
    try {
      setLoading(true); // Yükleme başladığında yüklemeyi başlat
      if (username === "guest") {
        window.location.href = "/login";
      } else {
        const res = await redirectToCheckout();
        if (res?.error) {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // İşlem tamamlandığında yüklemeyi durdur
    }
  };

  return (
    <>
      {
        loading &&
        <Loader />
      }
      <motion.button
        initial={{ opacity: 0.9 }}
        whileHover={{ scale: 1.1, opacity: 1 }}
        onClick={() => {
          handleCheckout();
        }}
        className="py-4 text-white uppercase bg-black hover:bg-black-100 
        w-full shadow-lg rounded-md"
        disabled={loading} // Yükleme sırasında butonu devre dışı bırak
      >
        Proceed To Checkout
      </motion.button>
    </>
  );
};

export default CheckoutBtn;
