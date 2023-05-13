import { useEffect, useState } from "react";
import Footer from "./footer";
import styles from './login.module.css';
import Nav from './Nav';
import Link from 'next/link';

export default function Login(){

    const [email,setEmail] = useState('nwa@gmail.com');
    const [password,setPassword] = useState('mypass');

    function handleEmail(e){
        setEmail(e.target.value)
    }
    
    function handlePassword(e){
        setPassword(e.target.value)
    }

    function login(){
        fetch('/api/login',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify({
             email: email,
             password: password
           })
        })
        .then(resp=>{
            return resp.json();
            
        })
        .then(
            resp=>{
               localStorage.setItem('followers',JSON.stringify(resp.followers))
               if(resp.userData) {
                const {surname, firstname, id} = resp.userData;
                localStorage.setItem('userdata',JSON.stringify({
                    firstname: firstname,
                    surname: surname,
                    userId: id
                }));
                location.href = '/'
             }
            }
        )
    }

    return(
        <>
        <Nav path={"Login"} />
        <main>
        <div className={styles.container}>
            <h1 className={styles.h1}>Login</h1>
            <div className={styles.dataInputContainer}>
               
                <div className={styles.dataInput}>  
                    <input  value={email}  onInput={(e)=>handleEmail(e)} className={styles.textInput} type={'text'} name='email' placeholder="Email" />
                </div>
               
                <div className={styles.dataInput}>  
                    <input value={password} onInput={(e)=>handlePassword(e)} className={styles.textInput} type={'text'} name='password' placeholder="Password" />
                </div>
                <div>
                    <button onClick={login}>Login</button>
                </div>
            </div>
        </div>
        <div>
            <span>Not Registered?</span>
            <Link href="/register">Register</Link>
        </div>
        </main>
        <Footer/>
        </>
    )
}