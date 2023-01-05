import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
const Context = createContext();

export const ProductContext = ({ children }) => {
  const [products, setProducts] = useState(null);

  const getAllProducts = async () => {
    await axios
      .get(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-products`)
      .then(async (res) => {
        setProducts(res.data.products);
      })
      .catch((e) => {});
  };

  const getProductById = async (id) => {
    let product = null;
    await axios
      .get(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/get-product-id/${id}`)
      .then(async (res) => {
        product = res.data.product;
      })
      .catch((e) => {
        product = [];
      });
    return product;
  };

  const postProduct = async (form) => {
    let confirmation = false;
    await axios
      .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/post-product`, form)
      .then(async (res) => {
        toast.success(res.data.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        confirmation = true;
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
    return confirmation;
  };

  const patchProduct = async (form, id) => {
    let confirmation = false;
    await axios
      .patch(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/patch-product/${id}`,
        form
      )
      .then(async (res) => {
        toast.success(res.data.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        confirmation = true;
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
    return confirmation;
  };

  const deleteProduct = async (id) => {
    await axios
      .delete(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-product/${id}`
      )
      .then(async (res) => {
        toast.success(res.data.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        getAllProducts();
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  return (
    <Context.Provider
      value={{
        products,
        getAllProducts,
        getProductById,
        postProduct,
        patchProduct,
        deleteProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useProductContext = () => {
  return useContext(Context);
};
