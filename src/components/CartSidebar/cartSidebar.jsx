"use client";
import CartItem from "./cartitem";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useShoppingCart } from "use-shopping-cart";
import CheckoutBtn from "../CheckoutBtn/checkoutBtn";
import CustomButtom from "./../custombuttom/custombuttom";
import { useSession } from "next-auth/react";

const CartSidebar = ({
  cartCount,
  removeItem,
  clearCart,
  incrementItem,
  decrementItem,
  totalPrice,
  cartDetails,
}) => {
  const { shouldDisplayCart, handleCartClick } = useShoppingCart();
  const { data: session, status: sessionStatus } = useSession();
  const username = sessionStatus === "authenticated" ? session.user?.email?.substring(0, session.user?.email?.indexOf("@")) : "guest";

  const cartCountValue = cartCount;
  const totalPriceValue = totalPrice(username);
  let savedCarts = {}; // Provide a default value
  if (typeof window !== 'undefined' && window.localStorage) {
    savedCarts = cartDetails(username) || {};
  }
  const arrayFromObject = Object.values(savedCarts);
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Shopping Cart</SheetTitle>
        </SheetHeader>
        <>
          {cartCountValue === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-[760px]">
              <h5 className="py-14 text-black/50 font-bold uppercase">
                Your cart is empty
              </h5>
            </div>
          ) : (
            <ScrollArea className="h-[70vh] xl:h-[74vh] pr-4 mb-4">
              {arrayFromObject.map((item, key) => {
                return (
                  <CartItem
                    username={username}
                    item={item}
                    key={key}
                    open={shouldDisplayCart}
                    removeItem={removeItem}
                    incrementItem={incrementItem}
                    decrementItem={decrementItem}
                  />
                );
              })}
            </ScrollArea>
          )}
        </>
        {cartCountValue > 0 && (
          <div>
            <div className="flex justify-between font-semibold">
              <div className="uppercase mb-5">Total</div>
              <div>
                {totalPriceValue
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                TL
              </div>
            </div>
            <CheckoutBtn items={arrayFromObject} username={username} />
            <CustomButtom
              title="Clear to Cart"
              containerStyles="py-4 mt-3 text-white uppercase bg-black hover:bg-black-100 
              w-full shadow-lg rounded-md"
              handleClick={() => {
                clearCart(username);
              }}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
