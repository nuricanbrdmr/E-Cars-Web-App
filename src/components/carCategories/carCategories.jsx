"use client";

import SearchBar from "@/components/SearchBar/searchbar";
import CustomFilter from "@/components/CustomFilter/customfilter";
import CarCard from "@/components/CarCard/carCard";
import styles from "./carCategories.module.css";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { yearsOfProduction, colors } from "@/constans";
import PriceBox from "../PriceBox/priceBox";
import ShowMore from "../ShowMore/showMore";

const CarCategories = ({ cars, addItem }) => {
  const yearList = yearsOfProduction;
  const colorList = colors;
  const [manufacturer, setManufacturer] = useState("ALL");
  const [carModel, setCarModel] = useState("");
  const [filterCar, setFilterCars] = useState([]);
  const [price, setPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState(9000000);
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [limit, setLimit] = useState(8);
  const [carLenght, setCarLenght] = useState(0);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const categoryMatch =
        manufacturer === "ALL"
          ? cars
          : car.categories.some((categ) => categ.name === manufacturer);
      const modelMatch =
        carModel === "" || carModel === "ALL" ? cars : car.model === carModel;
      const priceMatch = car.price >= price && car.price <= maxPrice;
      const yearMatch =
        year === "ALL" || year === "" ? true : car.year === year;
      const colorMatch =
        color === "ALL" || color === ""
          ? true
          : car.color.some((clr) => clr === color);
      return (
        categoryMatch && priceMatch && modelMatch && yearMatch && colorMatch
      );
    });
    setCarLenght(filtered.length); // toplam araba sayısı

    const firstEightCars = filtered.slice(0, limit);
    setFilterCars(firstEightCars);
  }, [manufacturer, carModel, year, color, price, cars, limit, carLenght, maxPrice]);

  return (
    <>
      <div data-aos="fade-up" className={styles.home__filters}>
        <SearchBar
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
          carModel={carModel}
          setCarModel={setCarModel}
          className="w-full"
        />
        <div className={styles.home__filter_container}>
          <div className="mr-2 max-w-[300px]">
            <div className="text-[16px] mb-2 font-medium flex">
              <PriceBox title="Min Price:" price={price} setPrice={setPrice} />
              <PriceBox
                title="Max Price:"
                price={maxPrice}
                setPrice={setMaxPrice}
              />
            </div>
            <Slider
              defaultValue={[price]}
              value={[price]}
              max={[maxPrice]}
              min={0}
              step={1}
              onValueChange={(val) => setPrice(val[0])}
            />
          </div>
          <CustomFilter
            title="Year"
            yearList={yearList}
            value={year}
            onChange={setYear}
          />
          <CustomFilter
            title="Colors"
            colors={colorList}
            value={color}
            onChange={setColor}
          />
        </div>
      </div>

      <CarCard
        cars={filterCar}
        filterCarLenght={filterCar.length}
        brand={manufacturer}
        model={carModel}
        addItem={addItem}
      />

      <ShowMore
        isNext={carLenght > limit}
        limit={limit}
        onChange={setLimit}
        maxLimit={carLenght}
      />

    </>
  );
};

export default CarCategories;
