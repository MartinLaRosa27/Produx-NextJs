import Head from "next/head";
import { auth } from "../middleware/auth";

export default function Login() {
  return (
    <>
      <Head>
        <title>Welcome to Produx</title>
      </Head>
      <main>
        <h1>Login</h1>
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
  if (await auth(token)) {
    return {
      redirect: {
        destination: "/",
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
