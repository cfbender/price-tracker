import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";

import "../styles/PriceInput.css";

const PriceInput = ({ setItems }: any) => {
  const auth = useAuth0();
  let user: any;
  if (auth) {
    user = auth.user;
  }

  const [itemName, updateItemName] = useState("");
  const [itemUrl, updateItemUrl] = useState("");
  const [urlError, setUrlError] = useState(false);

  function handleUrlChange(e: any) {
    updateItemUrl(e.target.value);
    const regex = new RegExp(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    );
    if (!regex.test(itemUrl)) {
      setUrlError(true);
    } else {
      setUrlError(false);
    }
  }

  async function handleSubmit() {
    const response = await fetch("/api/new", {
      method: "post",
      body: JSON.stringify({ name: itemName, url: itemUrl })
    });

    const data = await response.json();

    setItems(data);
  }

  return (
    <div className="form-container flex justify-center flex-col mx-auto">
      <div className="form mx-auto">
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
      <div className="form mx-auto">
        <input
          type="text"
          name="url"
          autoComplete="off"
          required
          value={itemUrl}
          onChange={handleUrlChange}
        />
        <label htmlFor="url" className="label-url">
          <span className="content-url">Item URL</span>
        </label>
        {urlError && (
          <h3 className="url-error text-red">Must be a valid URL</h3>
        )}
      </div>

      <button
        className="item-submit bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Add Item
      </button>
    </div>
  );
};

export default PriceInput;
