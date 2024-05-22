import Image from "next/image";

const TableItem = ({ icon, title, item }) => {
  return (
    <td className="text-gray-600 py-2 max-sm:flex max-sm:flex-col max-sm:w-full">
      <div className="flex items-center">
        <Image src={`/${icon}`} alt={""} width={50} height={25} />
        <div className="px-2">
          <h4 className="text-[15px]">{title}</h4>
          <span className="text-sm font-medium">{item}</span>
        </div>
      </div>
    </td>
  );
};

export default TableItem;
