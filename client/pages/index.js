import Head from "next/head";
import { Product } from "../components/home/Product";

export default function Home() {
  return (
    <>
      <Head>
        <title>Produx - Home</title>
      </Head>
      <main>
        <Product />
      </main>
    </>
  );
}
