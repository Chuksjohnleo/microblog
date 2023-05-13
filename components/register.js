import { useEffect,useState } from "react";
import styles from './register.module.css';
import Footer from "./footer";
import Nav from "./Nav";

export default function Register(){
    const [firstname, setFirstname] = useState('Chukwuka');
    const [surname, setSurname] = useState('Agina');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('mypass');
    const [email, setEmail] = useState('nwa@gmail.com');

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
    }
    
    function handlePassword(e){
        setPassword(e.target.value)
    }

    function register(){
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
                    console.log(resp)
                    localStorage.setItem('userdata',JSON.stringify({
                        firstname: firstname,
                        surname: surname,
                        userId: resp.userId
                    }));
                    location.href = '/'
                }
                console.log(resp)
            }
        )
    }

    return(
        <>
         <Nav path={"Register"} />
        <main>
        <div className={styles.container}>
            <h1 className={styles.h1}>Register</h1>
            <div className={styles.dataInputContainer}>
                <div className={styles.dataInput}>
                    <input value={firstname} onInput={(e)=>handleFirstname(e)} className={styles.textInput} type={'text'} name='firstname' placeholder="First Name" />
                </div>
                <div className={styles.dataInput}>  
                    <input  value={surname}  onInput={(e)=>handleSurname(e)} className={styles.textInput} type={'text'} name='surname' placeholder="Surname" />
                </div>
                <div className={styles.dataInput}>  
                    <input  value={email}  onInput={(e)=>handleEmail(e)} className={styles.textInput} type={'text'} name='email' placeholder="Email" />
                </div>
                <div className={styles.dataInput}>
                  <label className={styles.radioLabel}>
                    <input value="male" onInput={(e)=>handleGender(e)} className={styles.radioInput} type='radio' name='gender' />
                    Male  
                  </label>
                  <label className={styles.radioLabel}> 
                     <input value="female" onInput={(e)=>handleGender(e)} className={styles.radioInput} type='radio' name='gender' />
                     Female
                  </label>
                </div>
                <div className={styles.dataInput}>  
                    <input value={password} onInput={(e)=>handlePassword(e)} className={styles.textInput} type={'text'} name='password' placeholder="Password" />
                </div>
                <div>
                    <button onClick={register}>Register</button>
                </div>
            </div>
        </div>
        </main>
        <Footer/>
        </>
    )
}