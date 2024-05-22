import Order from "@/models/Order";
import connect from "@/utils/db";

const saveOrderToDatabase = async (userId, productIds, orderNumber, state) => {
  await connect();
  const order = new Order({
    userId,
    productId: productIds,
    orderNumber,
    state: state // or any initial state
  });
  try {
    await order.save();
    console.log('Order saved successfully:', order);
    return order; // Optionally return the saved order
  } catch (error) {
    console.error('Error saving order:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export default saveOrderToDatabase;