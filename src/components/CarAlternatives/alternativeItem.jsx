"use client";
import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import AlternativeTableItem from "./alternativeTableItem";
import Link from "next/link";
import { motion } from "framer-motion";

const AlternativeItem = ({ car }) => {

  return (
    <>
      <Link href={`/product/${car.slug}`}>
        <div className="group cursor-pointer">
          <div className="border h-full mb-5 p-4 overflow-hidden relative">
            <div className="bg-gray-50 h-[328px] w-full rounded-lg group-hover:bg-gray-100 transition-all duration-300 flex justify-center items-center">
              <div className="absolute top-8 left-8 bg-primary-blue text-white px-3 text-sm uppercase font-medium">
                {car.brand}
              </div>
              <motion.div 
              initial={{ opacity: 0.9 }}
              whileHover={{ scale: 1.1, opacity: 1 }} 
              >
                <Image
                  src={urlFor(car.images[0]).url()}
                  width={290}
                  height={125}
                  alt=""
                  className="object-contain"
                />
              </motion.div>
            </div>
            {/* Car Details */}
            <div className="py-3 border-b">
              <div className="font-extrabold text-[20px] truncate">
                {car.title}
              </div>
              <p className="font-medium text-sm">{car.chassis_type}</p>
              <div className="font-bold text-red-500 text-[18px] pt-1">
                {car.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} TL
              </div>
            </div>
            <div className="px-3 py-2 mt-2 rounded-lg hover:bg-gray-50">
              <table className="table w-full">
                <tbody>
                  <tr>
                    <AlternativeTableItem
                      icon={"casedoor.gif"}
                      title={"BATTERY"}
                      item={car.battery}
                    />
                    <AlternativeTableItem
                      icon={"range.gif"}
                      title={"RANGE"}
                      item={car.range}
                    />
                    <AlternativeTableItem
                      icon={"engine.gif"}
                      title={"ENGINE"}
                      item={car.engine}
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default AlternativeItem;
