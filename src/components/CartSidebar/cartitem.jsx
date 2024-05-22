import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { FaX, FaPlus, FaMinus } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

const CartItem = ({
  username,
  item,
  open,
  removeItem,
  incrementItem,
  decrementItem,
}) => {

  const buttonAnimate = {
    initial: {
      opacity: 0.9
    },
    whileHover: {
      scale: 1.1,
      opacity: 1,
    },
    whileHoverRemove: {
      scale: 1.1,
      opacity: 1,
      color: "red"
    },
    whileHoverIncrement: {
      scale: 1.1,
      opacity: 1,
      color: "green"
    },
  }
  return (
    <div className="flex w-full justify-between mb-4 items-center h-[120px] border-b">
      {/* image */}
      <motion.div
        variants={buttonAnimate}
        initial="initial"
        whileHover="whileHover"
        className="w-[110px] h-[110px] relative">
        <Image
          src={urlFor(item.images[0]).url()}
          alt="car_image"
          fill
          priority
          sizes="(max-width: 110px) 110px, 110px"
          className="object-contain"
        />
      </motion.div>
      {/* name price quantity remove */}
      <div className="w-full max-w-[180px] flex flex-col justify-center gap-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/product/${item.slug}`}
            onClick={() => (open.shouldDisplayCart = false)}
          >
            <h5>{item.name || item.title}</h5>
          </Link>
          {/* <h5>{item.name}</h5> */}
          <motion.button variants={buttonAnimate}
            initial="initial"
            whileHover="whileHoverRemove"
            onClick={() => removeItem(item.price_id, username)}>
            <FaX className="text-sm" />
          </motion.button>
        </div>
        {/* increment decrement item price */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <motion.button
              variants={buttonAnimate}
              initial="initial"
              whileHover="whileHoverRemove"
              onClick={() => decrementItem(item.price_id, username)}>
              <FaMinus className="text-[10px]" />
            </motion.button>
            <div className="font-semibold">{item.quantity}</div>
            <motion.button
              variants={buttonAnimate}
              initial="initial"
              whileHover="whileHoverIncrement"
              onClick={() => incrementItem(item.price_id, username)}>
              <FaPlus className="text-[10px]" />
            </motion.button>
          </div>
          <div className="font-semibold">
            {(item.price * item.quantity)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            TL
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
