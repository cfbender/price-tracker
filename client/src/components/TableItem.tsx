import React from "react";

const TableItem = ({
  name,
  currentPrice,
  originalPrice,
  lowestPrice,
  url,
  id
}: {
  name: string;
  currentPrice: string;
  originalPrice: string;
  lowestPrice: string;
  url: string;
  id: number;
}) => {
  return (
    <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
      <td className="border-grey-light border hover:bg-gray-100 p-3">{name}</td>
      <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
        ${currentPrice}
      </td>
      <td className="border-grey-light border hover:bg-gray-100 p-3">
        ${originalPrice}
      </td>
      <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
        ${lowestPrice}
      </td>
      <td className="border-grey-light border hover:bg-gray-100 p-3 text-indigo-400 hover:text-indigo-600 hover:font-medium cursor-pointer">
        <a href={url}>Link</a>
      </td>
      <td className="border-grey-light border hover:bg-gray-100 p-3 text-indigo-400 hover:text-indigo-600 hover:font-medium cursor-pointer">
        <button className="bg-red-800 rounded text-white p-3">Delete</button>
      </td>
    </tr>
  );
};

export default TableItem;
