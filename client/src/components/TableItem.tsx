import React, { SetStateAction, Dispatch } from "react";
import { useAuth0 } from "../react-auth0-spa";

const TableItem = ({
  name,
  currentPrice,
  originalPrice,
  lowestPrice,
  url,
  id,
  items,
  setItems
}: {
  name: string;
  currentPrice: string;
  originalPrice: string;
  lowestPrice: string;
  url: string;
  id: number;
  items: any[];
  setItems: Dispatch<SetStateAction<{}[]>>;
}) => {
  const auth = useAuth0();
  let getTokenSilently: any;
  if (auth) {
    getTokenSilently = auth.getTokenSilently;
  }

  async function handleDelete() {
    try {
      const token = await getTokenSilently();
      const response = await fetch(`/api/remove/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        method: "DELETE"
      });
      if (response.status === 200) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
      <td className="border-grey-light border hover:bg-gray-100 p-3">{name}</td>
      <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
        $
        {parseFloat(currentPrice)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </td>
      <td className="border-grey-light border hover:bg-gray-100 p-3">
        $
        {parseFloat(originalPrice)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </td>
      <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
        $
        {parseFloat(lowestPrice)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </td>
      <td className="border-grey-light border hover:bg-gray-100 p-3 text-indigo-400 hover:text-indigo-600 hover:font-medium cursor-pointer">
        <a href={url}>Link</a>
      </td>
      <td className="border-grey-light border hover:bg-gray-100 p-3 text-indigo-400 hover:text-indigo-600 hover:font-medium cursor-pointer">
        <button
          className="sm:bg-red-800 sm:rounded sm:text-white text-red-800 sm:p-3"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableItem;
