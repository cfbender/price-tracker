import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";

import "../styles/PriceInput.css";

const PriceInput = ({ setItems, updateLoading, setItemError }: any) => {
  const auth = useAuth0();
  let getTokenSilently: any;
  if (auth) {
    getTokenSilently = auth.getTokenSilently;
  }

  const [itemName, updateItemName] = useState("");
  const [itemUrl, updateItemUrl] = useState("");
  const [urlError, setUrlError] = useState(false);

  function handleUrlChange(e: any) {
    const value = e.clipboardData
      ? e.clipboardData.getData("Text")
      : e.target.value;
    updateItemUrl(value);
    const regex = new RegExp(
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    );
    if (!regex.test(itemUrl)) {
      setUrlError(true);
    } else {
      setUrlError(false);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!urlError) {
      let data = { url: itemUrl, name: itemName };
      updateItemName("");
      updateItemUrl("");
      updateLoading(true);
      try {
        const token = await getTokenSilently();
        const response = await fetch(`/api/new`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          method: "POST",
          body: JSON.stringify(data)
        });
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.error) {
          setItemError(true);
        }
        setItems(responseData);
        updateLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="form-container flex justify-center mx-auto">
      <form className="flex flex-col items-start ">
        <div className="flex  flex-col items-center">
          <div className="form w-64 sm:w-104 mx-auto">
            <input
              type="text"
              name="item"
              autoComplete="off"
              required
              value={itemName}
              onChange={e => updateItemName(e.target.value)}
            />
            <label htmlFor="item" className="label-item">
              <span className="content-item">Item Name</span>
            </label>
          </div>
          <div className="form  w-64 sm:w-104 mx-auto">
            <input
              type="text"
              name="url"
              autoComplete="off"
              required
              value={itemUrl}
              onChange={handleUrlChange}
              onPaste={handleUrlChange}
            />
            <label htmlFor="url" className="label-url">
              <span className="content-url">Item URL</span>
            </label>
            {urlError && (
              <h3 className="url-error text-red">Must be a valid URL</h3>
            )}
          </div>
        </div>
        <div className="mt-2">
          <input
            className="item-submit bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
            type="submit"
            value="Add Item"
          />
        </div>
      </form>
    </div>
  );
};

export default PriceInput;
