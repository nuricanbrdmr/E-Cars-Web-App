"use client";
import Hero from "@/components/Hero/hero";
import NavigateSideMenu from "@/components/NavigateSideMenu/navigateSideMenu";

//get data
import CarCategories from "@/components/carCategories/carCategories";
import { useEffect } from "react";

export default function Home({
  cars,
  addItem,
  username,
  transferItems,
  sessionStatus,
  initialized,
  setInitialized,
}: any) {
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      if (!initialized) {
        transferItems(username);
        setInitialized(true);
      }
    }
  }, []);
  return (
    <>
      <div className="overflow-hidden">
        <NavigateSideMenu />
        <div id="home">
          <Hero />
        </div>
        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div
            data-aos="fade-right"
            className="flex flex-col items-start justify-start gap-y-2.5 text-black-100"
          >
            <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
            <p>Explore the cars you might like</p>
          </div>
          <CarCategories cars={cars} addItem={addItem} />
        </div>
      </div>
    </>
  );
}
