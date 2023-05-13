import React, { useState } from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import whitetwitter from "./images/whitetwitter.svg";
import whitefacebook from "./images/whitefacebook.svg";
import whitelogo from "./images/whitelogo.svg";
import whitewhatsapp from "./images/whitewhatsapp.svg";
import whitetelegram from "./images/whitetelegram.svg";
import whiteyoutube from "./images/whiteyoutube.svg";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.up}>
          <a href="#">🔝</a>
        </div>
        <div>
          <p>Website by Chuksjohleo</p>
          <Image height={50} width={100} src={whitelogo} alt="logo" />
        </div>
        <p className={styles.social}>
          <a href="https://twitter.com/mariadevsQ">
            <Image height={50} width={50} src={whitetwitter} alt="twitter" />
          </a>
          <a href="https://twitter.com/mariadevsQ">
            <Image height={50} width={50} src={whitewhatsapp} alt="whatsapp" />
          </a>
          <a href="https://www.facebook.com/chuksjohnleo.nwanonenyi">
            <Image height={50} width={50} src={whitefacebook} alt="facebook" />
          </a>
          <a href="https://www.facebook.com/chuksjohnleo.nwanonenyi">
            <Image height={50} width={50} src={whiteyoutube} alt="facebook" />
          </a>
          <a href="https://www.facebook.com/chuksjohnleo.nwanonenyi">
            <Image className={styles.socialIcon} height={50} width={50} src={whitetelegram} alt="facebook" />
          </a>
        </p>
        <p>✉️Email: nwanonenyichukwuka@gmail.com</p>
        <p>God alone</p>
        
          <ul className={styles.lists}>
            <li>
              <a href="https://chuksjohnleo.github.io">Developers Site</a>
            </li>
            <li>ok</li>
          </ul>
        

        <p>
          &copy; Copyright <span>{year}</span> Chuksjohnleo, All rights are
          reserved
        </p>
      </footer>
    </>
  );
}
