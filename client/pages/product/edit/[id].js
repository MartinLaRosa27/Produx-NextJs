import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FormEditProduct } from "../../../components/productEdit/FormEditProduct";
import { useProductContext } from "../../../context/ProductContext";

export default function EditProduct({ _id }) {
  const [product, setProudct] = useState(null);

  const { getProductById } = useProductContext();

  useEffect(() => {
    const callGetProductById = async () => {
      setProudct(await getProductById(_id));
    };
    callGetProductById();
  }, []);

  return (
    <>
      <Head>
        <title>Produx - Edit Product {product}</title>
      </Head>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <h2 className="text-center mb-4 font-weight-bold mt-4">
              Edit Product
            </h2>
            {product !== null && product.length === 0 && (
              <h3 className="text-center">Product Information not found</h3>
            )}
            {product !== null && product.length > 0 && (
              <FormEditProduct product={product[0]} />
            )}
            {product === null && (
              <h3 className="text-center">Loading Product Information...</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      _id: params.id,
    },
  };
};
