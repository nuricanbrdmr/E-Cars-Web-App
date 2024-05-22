import { Listbox, Transition } from "@headlessui/react";
import styles from "./customfilter.module.css";
import { Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";

export interface CustomFilterProps {
  yearList?: string[];
  colors?: string[];
  title?: string;
  value?: string;
  onChange?: (manufacturer: string) => void;
}

const CustomFilter = ({
  yearList = [],
  colors = [],
  title,
  value,
  onChange = () => {},
}: CustomFilterProps) => {
  return (
    <div className="w-fit z-10">
      <Listbox value={value} onChange={onChange}>
        <div className="relative w-fit z-10">
          <Listbox.Button className={styles.custom_filter__btn}>
            {value || title}
            <IoIosArrowDown
              width={20}
              height={20}
              className="ml-4 object-contain"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={styles.custom_filter__options}>
              {yearList.length > 0 && (
                <>
                  {yearList.map((year) => (
                    <Listbox.Option
                      key={year}
                      value={year}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active
                            ? "bg-primary-blue text-white"
                            : "text-gray-900"
                        }`
                      }
                    >
                      {year}
                    </Listbox.Option>
                  ))}
                </>
              )}
              {colors.length > 0 && (
                <>
                  {colors.map((color) => (
                    <Listbox.Option
                      key={color}
                      value={color}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active
                            ? "bg-primary-blue text-white"
                            : "text-gray-900"
                        }`
                      }
                    >
                      {color}
                    </Listbox.Option>
                  ))}
                </>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
