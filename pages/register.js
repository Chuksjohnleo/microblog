import Register from "@/components/register";
import Head from "next/head";

export default function register(){
    return(
    <>
      <Head>
        <title>Register | Chuksjohnleo Blogs</title>
        <meta name="description" content="Register on Chuksjohnleo to post and interact." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
      <Register />
    </>
    )
}