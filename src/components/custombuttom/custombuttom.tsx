import Image from "next/image";
import React, { MouseEventHandler } from "react";
import { motion } from "framer-motion";

interface CustomButtomProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

const CustomButtom = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
}: CustomButtomProps) => {
  return (
    <div>
      <motion.button
        initial={{ opacity: 0.9 }}
        whileHover={{ scale: 1.1, opacity: 1 }}
        disabled={false}
        type={btnType || "button"}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}
      >
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon && (
          <div className="relative w-4 h-4">
            <Image
              src={rightIcon}
              alt="right icon"
              fill
              className="object-contain text-white"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
            />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default CustomButtom;
