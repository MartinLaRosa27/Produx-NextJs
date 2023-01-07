import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
const Context = createContext();

export const ProductContext = ({ children }) => {
  const [products, setProducts] = useState(null);

  const getAllProducts = async (token) => {
    await axios
      .put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-products`, {
        header: token,
      })
      .then(async (res) => {
        setProducts(res.data.products);
      })
      .catch((e) => {});
  };

  const getProductById = async (id, token) => {
    let product = null;
    await axios
      .put(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/get-product-id/${id}`,
        {
          header: token,
        }
      )
      .then(async (res) => {
        product = res.data.product;
      })
      .catch((e) => {
        product = [];
      });
    return product;
  };

  const getProductByName = async (name, token) => {
    await axios
      .put(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/get-product-name/${name}`,
        {
          header: token,
        }
      )
      .then(async (res) => {
        const products = res.data.products;
        if (products.length > 0) {
          setProducts(res.data.products);
        } else {
          toast.error(`No found results for the search "${name}"`, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((e) => {});
  };

  const postProduct = async (form, token) => {
    let confirmation = false;
    await axios
      .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/post-product`, {
        header: token,
        name: form.name,
        price: form.price,
      })
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

  const patchProduct = async (form, id, token) => {
    let confirmation = false;
    await axios
      .patch(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/patch-product/${id}`,
        {
          header: token,
          name: form.name,
          price: form.price,
        }
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

  const deleteProduct = async (id, token) => {
    await axios
      .delete(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-product/${id}`,
        {
          data: {
            header: token,
          },
        }
      )
      .then(async (res) => {
        toast.success(res.data.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        getAllProducts(token);
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
        getProductByName,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useProductContext = () => {
  return useContext(Context);
};
