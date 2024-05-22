"use client";

import styles from "./carcard.module.css";
import Car from "./car";

const CarCard = ({ cars, filterCarLenght, brand, model, addItem }) => {
  return (
    <div>
      {cars ? (
        <section>
          <div data-aos="fade-up">
            <span className="ml-5 font-normal">
              Your search for{" "}
              <span className="font-semibold uppercase">
                &quot;{brand} {model}&quot;
              </span>{" "}
              found
              <span className="text-red-600 font-semibold">
                {" "}
                {filterCarLenght}
                {" "}
              </span>
              sales.
            </span>
          </div>
          <div className={styles.home__cars_wrapper}>
            {cars?.map((car) => (
              <Car key={car._id} car={car} addItem={addItem} />
            ))}
          </div>
        </section>
      ) : (
        <div className={styles.home__error_container}>
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
        </div>
      )}
    </div>
  );
};

export default CarCard;
