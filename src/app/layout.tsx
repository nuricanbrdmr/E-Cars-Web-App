import SessionProvider from "@/utils/SessionProvider";
import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "@/components/CartSidebar/cartProvider";
import { ShoppingCartWrapper } from "@/constans/shoppingCartWrapper";
import { allData } from "@/constans";

export const metadata: Metadata = {
  title: "E-Cars",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cars = await allData();

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CartProvider>
            <ShoppingCartWrapper cars={cars}>{children}</ShoppingCartWrapper>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
