import React, { useState } from "react";
import { useProductContext } from "../../context/ProductContext";

export const Search = ({ token }) => {
  const { getProductByName } = useProductContext();
  const [productSearch, setProductSearch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getProductByName(productSearch, token);
    setProductSearch("");
  };

  return (
    <div>
      <h4 className="text-center mt-5">
        Search for a specific registered product
      </h4>
      <div className="search-form mt-3 mb-5">
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            value={productSearch}
            maxLength={140}
            minLength={1}
            onChange={(e) => setProductSearch(e.target.value)}
            required
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
