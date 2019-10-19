import React, { useState, useEffect } from "react";
import "../styles/PricesTable.css";
import animation from "../loading.gif";
import TableItem from "./TableItem";

const PricesTable = (props: any) => {
  const [items, setItems] = useState([{}]);
  const [loading, updateLoading] = useState(true);

  const testData = [
    {
      url:
        "https://www.amazon.com/Spectre-8th-Gen-Touchscreen-Convertible/dp/B0773JVW5Z/ref=pd_sbs_147_t_0/143-1807551-4484245?_encoding=UTF8&pd_rd_i=B0773JVW5Z&pd_rd_r=c36fbe60-43a9-47e3-9b25-efb46a37fa80&pd_rd_w=5YOZV&pd_rd_wg=8r8Oe&pf_rd_p=5cfcfe89-300f-47d2-b1ad-a4e27203a02a&pf_rd_r=MD61DDS7W3TAADC0CRMX&psc=1&refRID=MD61DDS7W3TAADC0CRMX",
      name: "HP Spectre",
      originalPrice: "1,286.86",
      currentPrice: "1,286.86",
      lowestPrice: "1,286.86"
    },
    {
      url:
        "https://www.amazon.com/Spectre-8th-Gen-Touchscreen-Convertible/dp/B0773JVW5Z/ref=pd_sbs_147_t_0/143-1807551-4484245?_encoding=UTF8&pd_rd_i=B0773JVW5Z&pd_rd_r=c36fbe60-43a9-47e3-9b25-efb46a37fa80&pd_rd_w=5YOZV&pd_rd_wg=8r8Oe&pf_rd_p=5cfcfe89-300f-47d2-b1ad-a4e27203a02a&pf_rd_r=MD61DDS7W3TAADC0CRMX&psc=1&refRID=MD61DDS7W3TAADC0CRMX",
      name: "HP Spectre",
      originalPrice: "1,286.86",
      currentPrice: "1,286.86",
      lowestPrice: "1,286.86"
    },
    {
      url:
        "https://www.amazon.com/Spectre-8th-Gen-Touchscreen-Convertible/dp/B0773JVW5Z/ref=pd_sbs_147_t_0/143-1807551-4484245?_encoding=UTF8&pd_rd_i=B0773JVW5Z&pd_rd_r=c36fbe60-43a9-47e3-9b25-efb46a37fa80&pd_rd_w=5YOZV&pd_rd_wg=8r8Oe&pf_rd_p=5cfcfe89-300f-47d2-b1ad-a4e27203a02a&pf_rd_r=MD61DDS7W3TAADC0CRMX&psc=1&refRID=MD61DDS7W3TAADC0CRMX",
      name: "HP Spectre",
      originalPrice: "1,286.86",
      currentPrice: "1,286.86",
      lowestPrice: "1,286.86"
    }
  ];
  useEffect(() => {
    setTimeout(() => {
      setItems(testData);
      updateLoading(false);
    }, 500);
  }, []);
  return (
    <div className="container w-full md:w-4/5 xl:w-3/5  mx-auto px-2 mt-24">
      {loading ? (
        <img src={animation} alt="Loading" className="mx-auto" />
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
              <TableItem {...item} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PricesTable;
