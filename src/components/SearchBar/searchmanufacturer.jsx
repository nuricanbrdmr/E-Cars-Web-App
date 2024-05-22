"use client";
import { Combobox, Transition } from "@headlessui/react";
import styles from "./searchbar.module.css";
import { manufacturers, carModels } from "@/constans";
import Image from "next/image";
import { useState, Fragment } from "react";

const SearchManufacturer = ({
  carBrand,
  manufacturer,
  setManufacturer,
  carModel,
  setCarModel,
  icon,
  inputDisplay,
}) => {
  const [query, setQuery] = useState("");

  let filteredOptions = [];
  if (manufacturer) {
    filteredOptions =
      query === ""
        ? manufacturers
        : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  } else {
    let models = ["ALL"];
    carModels.forEach((item) => {
      if (carBrand === "ALL") {
        if (item.brand && item.model) {
          models.push(item.model);
        }
      } else if (
        carBrand &&
        item.brand &&
        item.model &&
        carBrand.toLowerCase() === item.brand.toLowerCase()
      ) {
        models.push(item.model);
      }
    });
    filteredOptions =
      query === ""
        ? models
        : models.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  }

  return (
    <div className={styles.search_manufacturer}>
      <Combobox
        value={manufacturer || carModel}
        onChange={manufacturer ? setManufacturer : setCarModel}
      >
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src={`/${icon}`}
              alt="Car Logo"
              width={20}
              height={20}
              className="ml-4"
            />
          </Combobox.Button>

          <Combobox.Input
            className={inputDisplay}
            placeholder={manufacturer || carModel || "Search..."}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className={styles.search_manufacturer__options}>
              {filteredOptions.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className={styles.search_manufacturer__option}
                >
                  Create &quot;{query}&quot;
                </Combobox.Option>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option}
                    className={({ active }) => `
                        relative ${styles.search_manufacturer__option} ${active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`}
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate uppercase ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {option}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active
                              ? "text-white"
                              : "text-pribg-primary-purple"
                              }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
