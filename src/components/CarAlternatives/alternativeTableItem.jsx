import Image from "next/image";
const AlternativeTableItem = ({ icon, title, item }) => {
  return (
    <td className="text-gray-600 flex ">
      <div className="flex items-center w-full">
        <Image src={`/${icon}`} alt={""} width={50} height={25} />
        <div className="px-5 w-full flex justify-between items-center">
          <h4 className="text-[15px]">{title}</h4>
          <span className="text-sm font-medium">{item}</span>
        </div>
      </div>
    </td>
  );
};

export default AlternativeTableItem;
