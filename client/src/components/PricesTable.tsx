import React, { useState, useEffect } from "react";
import "../styles/PricesTable.css";
import { useAuth0 } from "../react-auth0-spa";
import animation from "../loading.gif";
import TableItem from "./TableItem";
import PriceInput from "./PriceInput";

const PricesTable = (props: any) => {
  const auth = useAuth0();
  let userLoading: any;
  if (auth) {
    userLoading = auth.loading;
  }
  const [items, setItems] = useState([{}]);
  const [loading, updateLoading] = useState(true);

  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getTokenSilently();
        const response = await fetch(`/api/user/data`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const responseData = await response.json();
        updateLoading(false);
        setItems(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    callApi();
  }, [getTokenSilently]);

  return (
    <div className="container w-full md:w-4/5 xl:w-3/5  mx-auto px-2 mt-24">
      {loading || userLoading ? (
        <div className="loadingScreen mx-auto">
          <h2 className="text-3xl">Updating Prices...</h2>
          <img src={animation} alt="Loading" />
        </div>
      ) : (
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            <tr className="bg-indigo-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Current Price</th>
              <th className="p-3 text-left">Price When Added</th>
              <th className="p-3 text-left">Lowest Price Since Added</th>
              <th className="p-3 text-left" style={{ width: "110px" }}>
                Link
              </th>
              <th className="p-3 text-left" style={{ width: "110px" }}>
                Delete
              </th>
            </tr>
            <tr className="bg-indigo-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Current Price</th>
              <th className="p-3 text-left">Price When Added</th>
              <th className="p-3 text-left">Lowest Price Since Added</th>
              <th className="p-3 text-left" style={{ width: "110px" }}>
                Link
              </th>
              <th className="p-3 text-left" style={{ width: "110px" }}>
                Delete
              </th>
            </tr>
            <tr className="bg-indigo-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Current Price</th>
              <th className="p-3 text-left">Price When Added</th>
              <th className="p-3 text-left">Lowest Price Since Added</th>
              <th className="p-3 text-left" style={{ width: "110px" }}>
                Link
              </th>
              <th className="p-3 text-left" style={{ width: "110px" }}>
                Delete
              </th>
            </tr>
            <tr className="bg-indigo-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Current Price</th>
              <th className="p-3 text-left">Price When Added</th>
              <th className="p-3 text-left">Lowest Price Since Added</th>
              <th className="p-3 text-left" style={{ width: "110px" }}>
                Link
              </th>
              <th className="p-3 text-left" style={{ width: "110px" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {items.map((item: any) => (
              <TableItem
                name={item.name}
                url={item.url}
                originalPrice={item.originalPrice}
                currentPrice={item.currentPrice}
                lowestPrice={item.lowestPrice}
                id={item.id}
                key={item.id}
              />
            ))}
          </tbody>
        </table>
      )}

      <PriceInput setItems={setItems} updateLoading={updateLoading} />
    </div>
  );
};

export default PricesTable;
