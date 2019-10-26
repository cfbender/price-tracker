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
  const defaultState: any[] = [];
  const [items, setItems] = useState(defaultState);
  const [loading, updateLoading] = useState(true);
  const [itemError, setItemError] = useState(false);

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
        console.log(responseData);
        if (responseData.error) {
          setItemError(true);
        } else {
          responseData.forEach((item: any) => {
            item.originalPrice === "Error" ||
            item.currentPrice === "Error" ||
            item.lowestPrice === "Error"
              ? setItemError(true)
              : setItemError(false);
          });
          setItems(responseData);
        }
        updateLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    callApi();
  }, [getTokenSilently]);

  return (
    <div className="container w-full md:w-4/5 xl:w-3/5  mx-auto px-2 mt-24">
      {loading || userLoading ? (
        <div className="loadingScreen flex flex-col items-center mx-auto">
          <span className="text-3xl">Updating Prices...</span>
          <img className="loading-animation" src={animation} alt="Loading" />
        </div>
      ) : items.length && items[0].id ? (
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            {items.map(i => (
              <tr className="bg-indigo-600 flex flex-col flex-no-wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
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
            ))}
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
                items={items}
                setItems={setItems}
                key={item.id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}

      {itemError && (
        <div className="loadingScreen flex text-center text-red-800 justify-center mx-auto">
          <span className="text-xl">
            There was an error with one of your items. If you just added an
            item, it was not supported by this application. Otherwise, try to
            delete an item with an error, or reload to try again.
          </span>
        </div>
      )}

      {!loading && !items.length ? (
        <div className="loadingScreen flex text-center justify-center mx-auto">
          <span className="text-xl">Add some items to get started!</span>
        </div>
      ) : (
        ""
      )}

      <PriceInput
        setItems={setItems}
        updateLoading={updateLoading}
        setItemError={setItemError}
      />
    </div>
  );
};

export default PricesTable;
