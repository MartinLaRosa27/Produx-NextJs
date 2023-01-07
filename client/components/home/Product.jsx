import React, { useEffect } from "react";
import { ProductInfo } from "./ProductInfo";
import { useProductContext } from "../../context/ProductContext";
import { Search } from "./Search";

export const Product = ({ token }) => {
  const { getAllProducts, products } = useProductContext();

  useEffect(() => {
    getAllProducts(token);
  }, []);

  return (
    <>
      <h2 className="text-center my-5">List of Products</h2>
      {products === null && <h3 className="text-center">Loading...</h3>}
      {products !== null && products.length === 0 && (
        <h3 className="text-center mb-5">There isn't any product registered</h3>
      )}
      {products !== null && products.length > 0 && (
        <>
          <Search token={token} />
          <table className="table table-striped container">
            <thead className="bg-primary table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <ProductInfo
                    product={product}
                    key={product._id}
                    token={token}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
