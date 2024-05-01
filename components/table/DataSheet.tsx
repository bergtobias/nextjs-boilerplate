import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

export function DataSheet({
  originalData,
  setIsSheetOpen,
}: {
  originalData: object;
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <form className=" p-5 flex flex-col gap-1 h-[79vh] overflow-auto relative   ml-2">
      <button
        className="absolute top-0 left-0 text-4xl"
        onClick={() => setIsSheetOpen(false)}
      >
        <MdClose />
      </button>
      {renderData(originalData)}
    </form>
  );
}

function renderData(data: any) {
  return Object.entries(data).map(([key, value]) => {
    // Check if the key ends with "Id"
    const isIdField = key.endsWith("Id") || key === "id";
    return (
      <div
        key={key}
        className={`justify-start items-start w-full grid grid-cols-3  ${
          isIdField ? "hidden" : "" // Hide the div if key ends with "Id"
        }`}
      >
        <label className="text-right mr-10 capitalize text-lg">{key}</label>
        {renderValue(value)}
      </div>
    );
  });
}

function renderValue(value: any) {
  if (Array.isArray(value)) {
    return (
      <div className="col-span-2">
        {value.map((item, index) => (
          <input key={index} className="w-full     " value={item} readOnly />
        ))}
      </div>
    );
  }

  if (typeof value === "object" && value !== null) {
    return <div className="col-span-2 w-full   ">{renderData(value)}</div>;
  }

  return <input className="col-span-2 w-full    p-1 " value={value} readOnly />;
}
