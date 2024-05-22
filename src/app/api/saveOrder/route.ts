import saveOrderToDatabase from "./../../../components/CartSidebar/orderService";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const POST = async (request: any) => {
  const { cartData, orderNumber, state } = await request.json();
  let productIds: string[] = []; // Ürün ID'lerinin tutulacağı dizi

  try {
    const session = await getServerSession();
    const email = session?.user?.email;
    const items = cartData;

    // Her bir ürünün price_id değerlerini alıp productIds dizisine ekleyin
    items.forEach((item: any) => {
      productIds.push(item.price_id);
    });

    // saveOrderToDatabase fonksiyonuna productIds dizisini geçin
    await saveOrderToDatabase(email, productIds, orderNumber, state);

    return new NextResponse(
      { message: "Order saved successfully" as string },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving order:", error); // Hata mesajını konsola yazdır
    return new NextResponse(
      { error: "Failed to save order" as string },
      { status: 500 }
    );
  }
};
