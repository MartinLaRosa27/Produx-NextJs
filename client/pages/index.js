import Head from "next/head";
import { Product } from "../components/home/Product";
import { Search } from "../components/home/Search";

export default function Home() {
  return (
    <>
      <Head>
        <title>Produx - Home</title>
      </Head>
      <main>
        <Search />
        <Product />
      </main>
    </>
  );
}
