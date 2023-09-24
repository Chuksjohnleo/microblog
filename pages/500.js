import Image from "next/image";
import Link from "next/link";

export default function Err500() {
 
    return(
        <>
          <div>
            <Image src='/favicon_io/favicon-16x16.png' alt='Chuksjohnleo logo' height={30} width={30} /> 
            <div> Post Does Not Exist </div>
            <Link title="home" href='/'>Return Home</Link>
          </div>
        </>
        )  
}
