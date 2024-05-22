import TableItem from "./tableItem";

const CarInfoTable = ({ car }) => {
  return (
    <table className="table border  border-gray-100">
      <tbody>
        <tr className="border-b">
          <TableItem
            icon={"casedoor.gif"}
            title={"Case Type / Door Number"}
            item={car.chassis_type}
          />
          <TableItem
            icon={"battery.gif"}
            title={"BATTERY"}
            item={car.battery}
          />
          <TableItem icon={"range.gif"} title={"RANGE"} item={car.range} />
        </tr>
        <tr>
          <TableItem icon={"engine.gif"} title={"ENGINE"} item={car.engine} />
          <TableItem
            icon={"consumption.gif"}
            title={"CONSUMPTION"}
            item={car.consumption}
          />
          <TableItem icon={"charge.gif"} title={"CHARGE"} item={car.charge} />
        </tr>
      </tbody>
    </table>
  );
};

export default CarInfoTable;
