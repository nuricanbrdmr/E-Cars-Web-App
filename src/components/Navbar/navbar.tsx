"use client";
import Link from "next/link";
import Image from "next/image";
import CustomButtom from "../custombuttom/custombuttom";
import { CgShoppingBag } from "react-icons/cg";
import CartSidebar from "../CartSidebar/cartSidebar";
import { useShoppingCart } from "use-shopping-cart";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Navbar = ({
  setCartCount,
  cartCount,
  removeItem,
  clearCart,
  incrementItem,
  decrementItem,
  totalPrice,
  cartDetails,
}: any) => {
  const { data: session, status: sessionStatus }: any = useSession();
  const username =
    sessionStatus === "authenticated"
      ? session.user?.email?.substring(0, session.user?.email?.indexOf("@"))
      : "guest";

  const { handleCartClick } = useShoppingCart();
  let cartCountValue = cartCount;
  useEffect(() => {
    setCartCount(username);
  });

  return (
    <header className="w-full fixed z-50" data-aos="fade-down">
      <nav className="bg-slate-50 bg-opacity-90 shadow-lg max-w-full sticky mx-auto flex justify-between items-center sm:px-16 px-4">
        <div className="p-3">
          <Link href={"/"}>
            <Image src={"/ecar_logo.png"} alt="logo" width={80} height={25} />
          </Link>
        </div>

        <div className="flex justify-end items-center">
          {!session ? (
            <>
              <Link href="/login">
                <CustomButtom
                  title="Sing In"
                  btnType="button"
                  containerStyles="text-white font-medium py-1 mr-2 rounded-full bg-primary-blue bg-opacity-90 hover:bg-opacity-100 min-w-[130px]"
                />
              </Link>
              <Link href="/register">
                <CustomButtom
                  title="Sing Up"
                  btnType="button"
                  containerStyles="text-white font-medium py-1 mr-2 rounded-full bg-primary-blue bg-opacity-90 hover:bg-opacity-100 min-w-[130px]"
                />
              </Link>
            </>
          ) : (
            <>
              <CustomButtom
                title={session.user?.email}
                btnType="button"
                containerStyles="text-white py-3 mr-3 rounded-full bg-primary-blue min-w-[130px]"
              />
              <CustomButtom
                title="Logout"
                btnType="button"
                containerStyles="text-white py-3 rounded-full bg-primary-blue min-w-[130px]"
                handleClick={() => signOut()}
              />
            </>
          )}

          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={() => handleCartClick()}
            className="relative pl-4 cursor-pointer"
          >
            <CgShoppingBag className="text-[26px] text-blue-900" />
            <div className="bg-red-600 w-[18px] h-[18px] absolute -right-1 -bottom-1 rounded-full text-white flex items-center justify-center text-sm font-medium">
              {cartCountValue}
            </div>
          </motion.div>

          {/* cardSidebar */}
          <CartSidebar
            cartCount={cartCount}
            removeItem={removeItem}
            clearCart={clearCart}
            incrementItem={incrementItem}
            decrementItem={decrementItem}
            totalPrice={totalPrice}
            cartDetails={cartDetails}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
