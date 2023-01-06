import Head from "next/head";
import { Product } from "../components/home/Product";
import {auth} from "../middleware/auth"

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

export const getServerSideProps = async (context) => {
  let token;
  if (typeof context.req.headers.cookie !== "string") {
    token = "Invalid token";
  } else {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    token = parsedCookies.token;
  }
  if (!await auth(token)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
    },
  };
};