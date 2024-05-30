"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import AlternativeItem from "./alternativeItem";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

const CarAlternatives = ({ cars, carBrand, carModel, chassisType }) => {
  const [filterCar, setFilterCars] = useState([]);
  const [limit, setLimit] = useState(8);
  const [carLenght, setCarLenght] = useState(0);

  useEffect(() => {
    const filtered = cars
      .filter((car) => {
        const categoryMatch = car.categories.some(
          (cri) => cri.name.toLowerCase().replace(/\s+/g, '') !== carBrand.toLowerCase().replace(/\s+/g, '')
        );
        const modelMatch = car.model.toLowerCase().replace(/\s+/g, '') === carModel.toLowerCase().replace(/\s+/g, '');
        return !categoryMatch || !modelMatch; // Marka eşleşmeli ama model eşleşmese de getir.
      })
      .sort((a, b) => {
        const categoryMatchA = a.categories.some(
          (cri) => cri.name.toLowerCase().replace(/\s+/g, '') === carBrand.toLowerCase().replace(/\s+/g, '')
        );
        const categoryMatchB = b.categories.some(
          (cri) => cri.name.toLowerCase().replace(/\s+/g, '') === carBrand.toLowerCase().replace(/\s+/g, '')
        );

        // Chassis_type eşleşmesine göre sıralama yap
        const chassisMatchA =
          a.chassis_type.toLowerCase().replace(/\s+/g, '') === chassisType.toLowerCase().replace(/\s+/g, '');
        const chassisMatchB =
          b.chassis_type.toLowerCase().replace(/\s+/g, '') === chassisType.toLowerCase().replace(/\s+/g, '');

        if (categoryMatchA !== categoryMatchB) {
          return categoryMatchA ? -1 : 1;
        }
        if (chassisMatchA !== chassisMatchB) {
          return chassisMatchA ? -1 : 1;
        }

        return a.model.localeCompare(b.model);
      });
    setCarLenght(filtered.length); // toplam araba sayısı

    const firstEightCars = filtered.slice(0, limit);
    setFilterCars(firstEightCars);
  }, [cars, chassisType, limit, carBrand, carModel]);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        960: { slidesPerView: 3 },
        1440: { slidesPerView: 4 },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={"populer_car"}
    >
      {filterCar.map((car) => {
        return (
          <SwiperSlide key={car._id}>
            <AlternativeItem car={car} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CarAlternatives;
