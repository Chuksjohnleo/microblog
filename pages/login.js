import Login from "@/components/login";
import Head from "next/head";


export default function register(){
    return(
    <>
      <Head>
        <title>Login | Chuksjohnleo Blogs</title>
        <meta name="description" content="Login to Chuksjohnleo to post and interact." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
      <Login />
    </>
    )
}