import { Header } from "../components/Header";
import Head from "next/head";
import "../styles/globals.css";
import { ProductContext } from "../context/ProductContext";
import { Toaster } from "react-hot-toast";
import { Footer } from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ProductContext>
        <Head>
          <title>Produx</title>
        </Head>
        <Toaster />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ProductContext>
    </>
  );
}
