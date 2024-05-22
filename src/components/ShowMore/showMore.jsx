import CustomButtom from "./../custombuttom/custombuttom";

const ShowMore = ({ isNext, limit, onChange, maxLimit }) => {
  const handleLimit = () => {
    let newLimit = limit + 10;
    if (maxLimit < newLimit) {
      newLimit = maxLimit;
    }
    onChange(newLimit);
  };
  return (
    <div className="w-full flex justify-center gap-5 mt-10" data-aos="fade-up">
      {isNext && (
        <CustomButtom
          title="Show More"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleLimit}
        />
      )}
    </div>
  );
};

export default ShowMore;
