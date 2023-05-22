import { useEffect, useState } from "react";
import Link from "next/link";
import styles from './register.module.css';
import Progress from "./progress";
import Footer from "./footer";
import { useRouter } from "next/router";

export default function Register(){
    const router = useRouter();

    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(false);
    const [progress, setProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleFirstname(e){
        setFirstname(e.target.value)
    }

    function handleSurname(e){
        setSurname(e.target.value)
    }

    
    function handleEmail(e){
        setEmail(e.target.value)
    }

    function handleGender(e){
        setGender(e.target.value)
        // console.log(e.target.value)
    }
    
    function handlePassword(e){
        setPassword(e.target.value)
    }

    useEffect(()=>{
        console.log(gender)
    },[gender])

    function register(){
        console.log(gender)
        firstname.length<1 
        ||firstname === ''
        ||firstname.includes(' ')
        ||firstname[0].includes(' ')
        ||firstname[firstname.length-1].includes(' ')?
            setErrorMessage('First name is empty or contained spaces'):
          surname.length<1
          surname === ''
        ||surname.includes(' ')
        ||surname[0].includes(' ')
        ||surname[surname.length-1].includes(' ')?
            setErrorMessage('Surname is empty or contained spaces'):
          email.length<1 
        || email === ''
        ||email.includes(' ')
        ||email[0].includes(' ')
        ||email[email.length-1].includes(' ')?
            setErrorMessage('Email is empty or contained spaces'):
          !gender.includes('male')
        &&!gender.includes('female')?
            setErrorMessage('Please select your gender'):
          password.includes(' ') 
        ||password.length < 8?
            setErrorMessage(`Password must include up to
          8 characters and spaces is not allowed`):post()
        
        function post(){
          setErrorMessage('');
          setProgress(true);
        fetch('/api/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify({
             firstname: firstname,
             surname: surname,
             email: email,
             gender: gender,
             password: password
           })
        })
        .then(resp=>{
            return resp.json()
        })
        .then(
            resp=>{
                if(resp.status === 'yes'){
                    console.log(resp);
                    // localStorage.setItem('followers',JSON.stringify([]));
                    if(resp.followers)localStorage.setItem('followers',JSON.stringify(resp.followers));
                    localStorage.setItem('userdata',JSON.stringify({
                        firstname: firstname,
                        surname: surname,
                        userId: resp.userId
                    }));
                    setStatus(true);
                    setProgress(false);
                    router.push('/');

                }else{
                    setStatus(false);
                    setProgress(false);
                    setErrorMessage('Error: Please retry')
                 }
                console.log(resp)
            }
        ).catch(e=>{
            console.error(e)
            setProgress(false);
            setStatus(false);
            setErrorMessage('Connection Error');
        })
    }
}

    return(
        <>
         <h1>Chuksjohnleo</h1><hr/>
         <div>
            <Link className={styles.homeLink} href='/'>Back Home</Link>
         </div>
        <main>
        <div className={styles.container}>
            <h1 className={styles.h1}>Register</h1>
            <div className={styles.errorMessage}><strong>{errorMessage}</strong></div>
            <div className={styles.dataInputContainer}>
                <div className={styles.dataInput}>
                    <label>First name</label>
                    <input value={firstname} onInput={(e)=>handleFirstname(e)} className={styles.textInput} type={'text'} name='firstname' placeholder="First Name" />
                </div>
                <div className={styles.dataInput}> 
                    <label>Surname</label> 
                    <input  value={surname}  onInput={(e)=>handleSurname(e)} className={styles.textInput} type={'text'} name='surname' placeholder="Surname" />
                </div>
                <div className={styles.dataInput}> 
                    <label>Email</label> 
                    <input  value={email}  onInput={(e)=>handleEmail(e)} className={styles.textInput} type={'text'} name='email' placeholder="Email" />
                </div>
                <div className={styles.dataInput}>
                  <label>Gender</label>
                  <div className={styles.genderInput}>
                   <div className={styles.radioLabel}>
                    <input value="male" onInput={(e)=>handleGender(e)} className={styles.radioInput} type='radio' name='gender' />
                    <span> Male </span>
                   </div>
                   <div className={styles.radioLabel}> 
                     <input value="female" onInput={(e)=>handleGender(e)} className={styles.radioInput} type='radio' name='gender' />
                     <span> Female </span>
                   </div>
                  </div>
                </div>
                <div className={styles.dataInput}> 
                    <label>Password</label> 
                    <input value={password} onInput={(e)=>handlePassword(e)} className={styles.textInput} type={'password'} name='password' placeholder="Password" />
                </div>
                <div className={styles.regBtnContainer}>
                    <button disabled={progress?true:false} className={styles.regBtn} onClick={register}>{
                    progress?<Progress height={'25px'} color={'navy'} status={status} />:'Register'}</button>
                </div>
            </div>
            <div className={styles.loginSuggestionContainer}>
              <span> Already Registered? </span>
              <Link href="/login"> Login </Link>
            </div>
        </div>
        </main>
        <Footer/>
        </>
    )
}