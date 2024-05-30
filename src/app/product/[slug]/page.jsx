"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

import { urlFor } from "@/app/lib/sanity";
import "react-toastify/dist/ReactToastify.css";
import { allData, getCarData } from "@/constans";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductCarVitrin from "./../../../components/ProductCarVitrin/productCarVitrin";
import CarInfoTable from "./../../../components/CarInfoTable/carInfoTable";
import CarTechnicalDetails from "../../../components/CarTechnicalDetails/carTechnicalDetails";
import CarAlternatives from "./../../../components/CarAlternatives/carAlternatives";
import { usePathname } from "next/navigation";

const ProductDetails = ({setCartCount, username}) => {
  const addItem = (carObject, username) => {
    var storedCartData = localStorage.getItem(username + "_cart");
  
    var cartDataObject;
    if (!storedCartData) {
      cartDataObject = {
        cartCount: 0,
        cartDetails: {},
        totalPrice: 0,
      };
    } else {
      cartDataObject = JSON.parse(storedCartData);
    }
  
    // carObject'in cartDetails içindeki id'sine göre mevcut bir öğe arayın
    const existingItem = cartDataObject.cartDetails[carObject.price_id];
  
    if (existingItem) {
      // Eğer aynı id'ye sahip bir öğe varsa, sadece quantity değerini artırın
      existingItem.quantity++;
    } else {
      cartDataObject.cartDetails[carObject.price_id] = {
        ...carObject,
        quantity: 1,
      };
    }
    cartDataObject.cartCount++;
    cartDataObject.totalPrice += parseInt(carObject.price);
  
    localStorage.setItem(username + "_cart", JSON.stringify(cartDataObject));
    setCartCount(username);
  };
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const [car, setCar] = useState(null);
  const [cars, setCars] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCarData = async () => {
      const carData = await getCarData(slug);
      const allCars = await allData();
      setCar(carData);
      setCars(allCars);
    };

    fetchCarData();
  }, [slug]);

  if (!car) {
    return (
      <div className="loader">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Image
            src={"/ecar_logo.png"}
            alt="ecars-logo"
            width={400}
            height={400}
          />
        </div>
      </div>
    );
  } else {
    document.title = car.title;
  }

  const images = [
    { src: car.images[0], alt: "First" },
    { src: car.images[1], alt: "Second" },
    { src: car.images[2], alt: "Third" },
    { src: car.images[3], alt: "Fourth" },
  ];

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="container mx-auto">
          <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col gap-14">
            <div
              data-aos="fade-right"
              className="xl:flex-1 w-full xl:w-[50%] lg:w-[50%] md:w-full sm:w-full flex-col xl:h-[600px] md:h-[440px] sm:h-[540px]
        flex justify-center items-center"
            >
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-96 w-full rounded-lg"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex h-full w-full items-center justify-center">
                      <Image
                        src={urlFor(image.src).url()}
                        width={500}
                        height={400}
                        alt={image.alt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnail */}
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs mt-3 h-32 w-full rounded-lg"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <button className="flex h-full w-full items-center justify-center">
                      <Image
                        src={urlFor(image.src).url()}
                        width={500}
                        height={400}
                        alt={image.alt}
                        className="object-contain p-1 border shadow-sm hover:bg-gray-100 rounded-md"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div
              data-aos="fade-left"
              className="flex-1 w-full xl:w-[50%] lg:w-[50%] md:w-full sm:w-full flex px-4 flex-col justify-center items-start gap-10"
            >
              <Link
                href={"/"}
                className="flex items-center text-black-100 gap-2 font-semibold hover:text-red-500"
              >
                <FaChevronLeft size={20} />
                Back to Home
              </Link>
              {/* Car title, price, description, addToCart */}
              <ProductCarVitrin car={car} addItem={addItem} />
              {/* Car info */}
              <div className="flex flex-col w-full gap-1">
                <CarInfoTable car={car} />
              </div>
            </div>
          </div>
          {/* Car Technical Specifications */}
          <div className="px-8" data-aos="fade-up">
            <h4 className="text-center my-2">
              {car.title} technical specifications
            </h4>
            <CarTechnicalDetails car={car} />
          </div>

          {/* Car Slider */}
          <div className="px-8 mt-8" data-aos="fade-up">
            <h4 className="text-center my-2">{car.title} alternatives</h4>
            <CarAlternatives
              cars={cars}
              carBrand={car.brand}
              carModel={car.model}
              chassisType={car.chassis_type}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
