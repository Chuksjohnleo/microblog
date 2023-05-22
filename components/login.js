import { useEffect, useState } from "react";
import Footer from "./footer";
import styles from './login.module.css';
import Link from 'next/link';
import Progress from "./progress";
import { useRouter } from "next/router";

export default function Login(){
    const router = useRouter();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [status, setStatus] = useState(false);
    const [progress, setProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleEmail(e){
        setEmail(e.target.value)
    }
    
    function handlePassword(e){
        setPassword(e.target.value)
    }

    function login(){
        setErrorMessage('')
        setProgress(true);

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
              
               if(resp.followers)localStorage.setItem('followers',JSON.stringify(resp.followers));
               if(resp.userData) {
                const {surname, firstname, id} = resp.userData;
                localStorage.setItem('userdata', JSON.stringify({
                    firstname: firstname,
                    surname: surname,
                    userId: id
                }));
               setStatus(true);
               setProgress(false);
               router.push('/');
             }else{
                setStatus(false);
                setProgress(false);
                setErrorMessage('Incorrect details')
             }
            }
        ).catch(e=>{
            console.error(e);
            setProgress(false);
            setStatus(false);
            setErrorMessage('Connection Error');
        })
    }

    return(
        <>
         <h1>Chuksjohnleo</h1><hr/>
         <div>
            <Link className={styles.homeLink} href='/'>Back Home</Link>
         </div>
        <main>
        <div className={styles.container}>
            <h1 className={styles.h1}>Login</h1>
            <div className={styles.errorMessage}><strong>{errorMessage}</strong></div>
            <div className={styles.dataInputContainer}>
               
                <div className={styles.dataInput}> 
                    <label>Email</label>
                    <input  value={email}  onInput={(e)=>handleEmail(e)} className={styles.textInput} type={'text'} name='Your email' placeholder="Email" />
                </div>
               
                <div className={styles.dataInput}>  
                    <label>Password</label>
                    <input value={password} onInput={(e)=>handlePassword(e)} className={styles.textInput} type={'password'} name='Your password' placeholder="Password" />
                </div>
                <div className={styles.loginBtnContainer}>
                    <button disabled={progress?true:false} className={styles.loginBtn} onClick={login}>{
                    progress?<Progress height={'25px'} color={'navy'} status={status} />:'Login'}</button>
                </div>
            </div>
            <div className={styles.regSuggestionContainer}>
              <span> Not Registered? </span>
              <Link href="/register"> Register </Link>
            </div>
        </div>
        </main>
        <Footer/>
        </>
    )
}