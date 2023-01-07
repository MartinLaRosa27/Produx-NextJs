import React, { useState } from "react";
import { Header } from "../components/Header";
import Head from "next/head";
import "../styles/globals.css";
import { ProductContext } from "../context/ProductContext";
import { Toaster } from "react-hot-toast";
import { Footer } from "../components/Footer";
import { UserContext } from "../context/UserContext";

export default function App({ Component, pageProps }) {
  const [userToken, setUserToken] = useState(null);

  return (
    <>
      <ProductContext>
        <UserContext>
          <Head>
            <title>Produx</title>
          </Head>
          <Toaster />
          <Header userToken={userToken} />
          <Component {...pageProps} setUserToken={setUserToken} />
          <Footer />
        </UserContext>
      </ProductContext>
    </>
  );
}

export const getServerSideProps = async (context) => {
  console.log("asdsad");
  return {
    props: {
      token: "dqwdw",
    },
  };
};
