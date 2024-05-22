import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CarTechnicalDetils = ({ car }) => {
  let [categories] = useState({
    Power_and_Speed: [
      {
        id: 1,
        title: "Engine Power",
        desc: car.engine_power,
      },
      {
        id: 2,
        title: "Tork",
        desc: car.tork,
      },
      {
        id: 3,
        title: "Maximum Speed",
        desc: car.maximum_speed,
      },
      {
        id: 4,
        title: "0-100 km/s",
        desc: car.zero_hundred,
      },
      {
        id: 5,
        title: "Engine Size",
        desc: car.engine_size,
      },
      {
        id: 6,
        title: "Driving System",
        desc: car.driving_system,
      },
      {
        id: 7,
        title: "Engine Type",
        desc: car.engine_type,
      },
    ],
    Battery_and_Charging: [
      {
        id: 1,
        title: "Battery",
        desc: car.battery,
      },
      {
        id: 2,
        title: "Range",
        desc: car.range,
      },
      {
        id: 3,
        title: "DC Charging Speed",
        desc: car.dc_speed,
      },
      {
        id: 4,
        title: "AC Charging Speed",
        desc: car.ac_speed,
      },
      {
        id: 5,
        title: "DC Charging Time",
        desc: car.dc_time,
      },
      {
        id: 6,
        title: "AC Charging Time",
        desc: car.ac_time,
      },
    ],
    Car_Features: [
      {
        id: 1,
        title: "Weight",
        desc: car.weight,
      },
      {
        id: 2,
        title: "Length",
        desc: car.length,
      },
      {
        id: 3,
        title: "Width",
        desc: car.width,
      },
      {
        id: 4,
        title: "Height",
        desc: car.height,
      },
      {
        id: 5,
        title: "Luggage Volume",
        desc: car.luggage,
      },
      {
        id: 6,
        title: "Year",
        desc: car.year,
      },
      {
        id: 7,
        title: "Colors",
        desc: car.color.toString(),
      },
    ],
    Extra_Features: [
      {
        id: 1,
        title: "Car Type / Door size",
        desc: car.chassis_type,
      },
      {
        id: 2,
        title: "Autonomous Driving",
        desc: car.driving,
      },
      {
        id: 3,
        title: "Production Location",
        desc: car.location,
      },
      {
        id: 4,
        title: "Security",
        desc: car.security,
      },
      {
        id: 5,
        title: "Other",
        desc: car.other,
      },
    ],
  });

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-md">
        {Object.keys(categories).map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                "w-full rounded-t-md py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white border outline-none border-b-0 shadow-sm border-gray-300 text-blue-700 "
                  : "font-bold bg-gray-100 border border-gray-300 hover:bg-gray-200 "
              )
            }
          >
            {category.replace(/_/g, " ")}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="rounded-sm shadow-md">
        {Object.values(categories).map((posts, idx) => (
          <Tab.Panel
            key={idx}
            className={classNames(
              " bg-white p-2",
              "ring-white/60 focus:outline-none focus:ring-2"
            )}
            data-aos="fade-zoom-out"
            data-duration="1000"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className={`${post.id % 2 === 0 ? "" : "bg-gray-100"}`}
                  >
                    <td className="px-6 py-4 w-[30%] text-gray-500 border-r border-gray-300 font-semibold whitespace-nowrap">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 w-[70%] font-medium whitespace-nowrap">
                      {post.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default CarTechnicalDetils;
