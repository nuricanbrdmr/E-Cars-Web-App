"use client";

import { Input } from "@/components/ui/input";
import { FaLiraSign } from "react-icons/fa";

const PriceBox = ({ title, price, setPrice }) => {
  const formatPrice = (price) => {
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice;
  };
  return (
    <div className="mr-2 w-[100%]">
      <span>{title}</span>
      <Input
        type="text"
        placeholder="Min Price.."
        value={formatPrice(price)}
        onChange={(e) => {
          const numericValue = parseFloat(
            e.target.value.replace(/[^\d.]/g, "")
          );
          setPrice(isNaN(numericValue) ? "" : numericValue);
        }}
        addonAfter={<FaLiraSign className="w-4 h-4 object-contain" />}
      />
    </div>
  );
};

export default PriceBox;
