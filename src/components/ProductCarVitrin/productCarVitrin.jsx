import AddToCart from "../addToCart/addToCart";

const ProductCarVitrin = ({ car, addItem }) => {
  return (
    <div className="flex flex-col  gap-6 items-start">
      <div>
        <h1 className="text-xl py-2 px-3 font-extrabold">{car.title}</h1>
        <p className="text-lg px-3 font-bold">
          {car.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} TL
        </p>
      </div>
      <p className="text-black-100 px-3 font-medium">{car.description}</p>
      {/* botton */}
      <AddToCart
        addItem={addItem}
        price_id={car.price_id}
        name={car.title}
        currency="TL"
        description={car.description}
        images={car.images}
        price={car.price}
        slug={car.slug}
        title="Add to Card"
        containerStyles="w-50 py-[16px rounded-full bg-red-500"
        textStyles="text-white text-[14px] leading-[17px] font-bold mr-3"
        rightIcon="/add-to-basket.png"
      />
    </div>
  );
};

export default ProductCarVitrin;
