import React, { useEffect, useRef, useState, useContext } from "react";
import Sidebar from "./sidebar";
import Image from "next/image";
import logo from "./images/logo.svg";
import styles from "./nav.module.css";
import { HomeContext } from "./homeLayout";
import Link from 'next/link';

export default function Nav({ path, majorPath }) {
 
  const { setNavPosition, navPosition, navZindex } = useContext(HomeContext);
 
  const [sidebar, setSidebar] = useState("closed");
  const [visibleSearch, setVisibleSearch] = useState("invisible");


  const currentPath = useRef(null);
  const homepath = useRef(null);
  const newspath = useRef(null);
  const learningpath = useRef(null);
  const sportspath = useRef(null);
  const storiespath = useRef(null);
  const politicspath = useRef(null);
  const historypath = useRef(null);
  const religionpath = useRef(null);
  const loveAndFamilypath = useRef(null);
  const petsAndAnimalspath = useRef(null);
  const healthpath = useRef(null);
  const scienceAndTechnologypath = useRef(null);
  const ictpath = useRef(null);

  const searchRef = useRef(null);

  function currentPathStyle() {
    
    currentPath?.current?.scrollIntoView({ behaviour: "smooth" });
  }

  useEffect(() => {
    if (majorPath === "Chats" || majorPath === "Notifications") return;
    currentPathStyle();
  });

  function openAndCloseSiderbar() {
    const html = document.querySelector("html");
    if (sidebar === "closed"){
      if(navPosition==='static'){
        setNavPosition('sticky');
      }
       setSidebar("opened");
       html.style.overflow = 'hidden';
       return
      }
    else{
       html.style.overflow = 'auto';
       return setSidebar("closed");
      }
  }

  function openAndCloseSearch() {
    if (visibleSearch === "visible") return setVisibleSearch("invisible");
    else return setVisibleSearch("visible");
  }
  
  

  useEffect(()=>{
      window.addEventListener("resize", () => {
      if (window.innerWidth > 1000){
        document.querySelector("html").style.overflow = 'auto';
        return setSidebar("closed");
      }
    });
    window.scrollTo(0,0);
  }, [])

  // document.getElementById('header').scrollIntoView();

  //  document.getElementById('Home').scrollIntoView()
  return (
    <>
      <div id="header" style={{position: navPosition, zIndex: navZindex}} className={styles.header}>
        <div id='nextRouteAnnouncer' className={styles.nextRouteAnnouncer}></div>
        <nav className={styles.important} style={{ color: "navy" }}>
          <div className={styles.h11Container}>
          <div className={styles.idContainer1}>
            <div className={styles.logoContainer}>
              {/* <button onClick={()=>window.scrollTo(0,0)}>ok</button> */}
              <Image className={styles.logo} alt="logo" src={logo} height={30} width={30} />
            </div>
            <h1 className={styles.h11}>Chuksjohnleo</h1>
          </div>
          </div>
          <div className={styles.action}><Link href="/login" className={styles.login}>Login </Link><Link href="/register" className={styles.register}>Register</Link></div>
        </nav>
        <nav className={styles.nav}>
          <div className={styles.idContainer2}>
            <div className={styles.logoContainer}>
              <Image className={styles.logo} alt="logo" src={logo} height={30} width={30} />
            </div>
            <h1 className={styles.h12}>Chuksjohnleo</h1>
          </div>
          <div className={styles.navIconContainer + " " + styles.infoParent}>
            <Link href="/" >
              <svg
                className={
                  majorPath === "Chuksjohnleo"
                    ? styles.navIcon + " " + styles.navyBorder
                    : styles.navIcon + " " + styles.navNavy
                }
                width="800px"
                height="800px"
                viewBox="0 0 1024 1024"
                fill="#000000"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M972 520.8c-6.4 0-12-2.4-16.8-7.2L530.4 86.4c-4.8-4.8-11.2-8-18.4-8-6.4 0-12.8 2.4-18.4 8L68.8 512c-4.8 4.8-10.4 7.2-16.8 7.2s-12-2.4-16-6.4c-4.8-4-7.2-8.8-7.2-15.2-0.8-7.2 2.4-14.4 7.2-19.2L458.4 52.8c14.4-14.4 32.8-22.4 52.8-22.4s38.4 8 52.8 22.4L988.8 480c4.8 4.8 7.2 11.2 7.2 18.4 0 7.2-4 13.6-8.8 17.6-4.8 3.2-10.4 4.8-15.2 4.8z"
                  fill=""
                />
                <path
                  d="M637.6 998.4v-33.6h-33.6V904c0-51.2-41.6-92-92-92-51.2 0-92 41.6-92 92v60.8h-33.6v33.6H196.8c-40.8 0-73.6-32.8-73.6-73.6V509.6c0-13.6 10.4-24 24-24s24 10.4 24 24v415.2c0 14.4 11.2 25.6 25.6 25.6h175.2v-45.6c0-77.6 63.2-140 140-140s140 63.2 140 140v45.6h175.2c14.4 0 25.6-11.2 25.6-25.6V509.6c0-13.6 10.4-24 24-24s24 10.4 24 24v415.2c0 40.8-32.8 73.6-73.6 73.6H637.6z"
                  fill=""
                />
                <path
                  d="M604 998.4v-48h48v48h-48z m-232 0v-48h48v48h-48z"
                  fill="black"
                />
              </svg>
              {/* <Image
              alt="icon"
              className={
                u === "Home"
                  ? styles.navIcon + " " + styles.navyBorder
                  : styles.navIcon
              }
              src={homeicon}
            /> */}
             <span style={{ zIndex: 99 }} className={styles.dsc}>
              Home
            </span>
            </Link>
            {/* <span style={{ zIndex: 999 }} className={styles.dsc}>
              Home
            </span> */}
          </div>
          <div className={styles.navIconContainer + " " + styles.infoParent}>
            <span className={styles.info}>{majorPath === "Chats" ? "" : "29"}</span>
            <Link href="/chats">
              <svg
                className={
                  majorPath === "Chats"
                    ? styles.navIcon + " " + styles.navyBorder
                    : styles.navIcon + " " + styles.navNavy
                }
                width="800px"
                height="800px"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="layer1">
                  <path
                    d={
                      "M 0 1 L 0 12 L 2 12 L 2 15.5 C 2 15.776142 2.2238576 16 2.5 16 C 2.6326005 15.99998 2.7597628 15.94729 2.8535156 15.853516 C 4.1335162 14.57007 6.7070312 12 6.7070312 12 L 17 12 L 17 1 L 0 1 z M 1 2 L 16 2 L 16 11 L 6.2929688 11 L 3 14.292969 L 3 11 L 1 11 L 1 2 z M 3 4 L 3 5 L 11 5 L 11 4 L 3 4 z M 18 4 L 18 5 L 19 5 L 19 14 L 17 14 L 17 17.292969 L 13.707031 14 L 6 14 L 5 15 L 13.292969 15 C 13.292969 15 15.866484 17.57007 17.146484 18.853516 C 17.240237 18.94729 17.367399 18.99998 17.5 19 C 17.776142 19 18 18.776142 18 18.5 L 18 15 L 20 15 L 20 4 L 18 4 z M 3 6 L 3 7 L 7 7 L 7 6 L 3 6 z M 3 8 L 3 9 L 13 9 L 13 8 L 3 8 z "
                    }
                    style={{
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: "0px",
                    }}
                  />
                </g>
              </svg>
              {/* <Image
              alt="icon"
              className={
                u === "Chats"
                  ? styles.navIcon + " " + styles.navyBorder
                  : styles.navIcon
              }
              src={chaticon}
            /> */}
             <span style={{ zIndex: 99 }} className={styles.dsc}>
              Chats
            </span>
            </Link>
            {/* <span style={{ zIndex: 999 }} className={styles.dsc}>
              Chats
            </span> */}
          </div>
          <div className={styles.navIconContainer + " " + styles.infoParent}>
            <span className={styles.info}>
              {majorPath === "Notifications" ? "" : "202"}
             {/* if the user in in notification page, the number of notification clears */}
            </span>
            <Link href="/notifications">
              <svg
                className={
                  majorPath === "Notifications"
                    ? styles.navIcon + " " + styles.navyBorder
                    : styles.navIcon + " " + styles.navNavy
                }
                width="800px"
                height="800px"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="layer1">
                  <path
                    d={
                      "M 9 1 L 9 2.1054688 L 8.7070312 2.1699219 L 8.2890625 2.3027344 L 7.8867188 2.46875 L 7.5 2.6699219 L 7.1308594 2.9042969 L 6.7851562 3.1699219 L 6.4628906 3.4628906 L 6.1699219 3.7871094 L 5.9023438 4.1328125 L 5.6699219 4.5 L 5.46875 4.8867188 L 5.3007812 5.2890625 L 5.1679688 5.7050781 L 5.0742188 6.1308594 L 5.0175781 6.5644531 L 5 7 L 4.9804688 7.7597656 L 4.9238281 8.5195312 L 4.8261719 9.2753906 L 4.6914062 10.023438 L 4.5195312 10.765625 L 4.3085938 11.498047 L 4.0625 12.216797 L 3.78125 12.923828 L 3.4628906 13.615234 L 3.109375 14.289062 L 2.7226562 14.943359 L 2.3027344 15.580078 L 1.8515625 16.193359 L 1.7832031 16.314453 L 1.75 16.449219 L 1.7539062 16.585938 L 1.7988281 16.720703 L 1.8769531 16.835938 L 1.9824219 16.923828 L 2.109375 16.980469 L 2.2480469 17 L 7.171875 17 L 7.296875 17.302734 L 7.4589844 17.595703 L 7.6542969 17.869141 L 7.8789062 18.121094 L 8.1308594 18.345703 L 8.4042969 18.541016 L 8.6972656 18.701172 L 9.0097656 18.832031 L 9.3320312 18.925781 L 9.6640625 18.980469 L 10 19 L 10.335938 18.980469 L 10.667969 18.925781 L 10.992188 18.832031 L 11.302734 18.701172 L 11.595703 18.541016 L 11.871094 18.345703 L 12.121094 18.121094 L 12.345703 17.869141 L 12.541016 17.595703 L 12.703125 17.302734 L 12.828125 17 L 17.751953 17 L 17.890625 16.980469 L 18.017578 16.923828 L 18.125 16.835938 L 18.203125 16.720703 L 18.246094 16.585938 L 18.25 16.449219 L 18.216797 16.314453 L 18.146484 16.193359 L 17.697266 15.580078 L 17.277344 14.943359 L 16.890625 14.289062 L 16.539062 13.615234 L 16.21875 12.923828 L 15.9375 12.216797 L 15.691406 11.498047 L 15.480469 10.765625 L 15.306641 10.023438 L 15.173828 9.2753906 L 15.076172 8.5195312 L 15.019531 7.7597656 L 15 7 L 14.980469 6.5644531 L 14.923828 6.1308594 L 14.830078 5.7050781 L 14.699219 5.2890625 L 14.53125 4.8867188 L 14.330078 4.5 L 14.095703 4.1328125 L 13.830078 3.7871094 L 13.535156 3.4628906 L 13.214844 3.1699219 L 12.867188 2.9042969 L 12.498047 2.6699219 L 12.111328 2.46875 L 11.708984 2.3027344 L 11.294922 2.1699219 L 11 2.1054688 L 11 1 L 9 1 z M 10 3 L 10.392578 3.0195312 L 10.78125 3.078125 L 11.162109 3.1738281 L 11.53125 3.3046875 L 11.884766 3.4726562 L 12.222656 3.6738281 L 12.539062 3.9082031 L 12.830078 4.171875 L 13.091797 4.4628906 L 13.326172 4.7773438 L 13.529297 5.1132812 L 13.695312 5.46875 L 13.828125 5.8398438 L 13.923828 6.21875 L 13.980469 6.6074219 L 14 7 L 14.017578 7.734375 L 14.068359 8.46875 L 14.152344 9.1992188 L 14.269531 9.9238281 L 14.419922 10.644531 L 14.605469 11.355469 L 14.822266 12.058594 L 15.070312 12.75 L 15.349609 13.429688 L 15.660156 14.095703 L 16.001953 14.748047 L 16.371094 15.382812 L 16.771484 16 L 3.2285156 16 L 3.6269531 15.382812 L 3.9980469 14.748047 L 4.3398438 14.095703 L 4.6503906 13.429688 L 4.9296875 12.75 L 5.1796875 12.058594 L 5.3945312 11.355469 L 5.578125 10.644531 L 5.7304688 9.9238281 L 5.8496094 9.1992188 L 5.9316406 8.46875 L 5.984375 7.734375 L 6 7 L 6.0195312 6.6074219 L 6.078125 6.21875 L 6.171875 5.8398438 L 6.3046875 5.46875 L 6.4707031 5.1132812 L 6.6738281 4.7773438 L 6.9082031 4.4628906 L 7.171875 4.171875 L 7.4628906 3.9082031 L 7.7773438 3.6738281 L 8.1132812 3.4726562 L 8.46875 3.3046875 L 8.8398438 3.1738281 L 9.21875 3.078125 L 9.6074219 3.0195312 L 10 3 z M 8.2714844 17 L 11.728516 17 L 11.708984 17.039062 L 11.552734 17.261719 L 11.365234 17.462891 L 11.152344 17.634766 L 10.919922 17.775391 L 10.669922 17.884766 L 10.408203 17.958984 L 10.136719 17.996094 L 9.8632812 17.996094 L 9.59375 17.958984 L 9.3320312 17.884766 L 9.0800781 17.775391 L 8.8476562 17.634766 L 8.6367188 17.462891 L 8.4492188 17.261719 L 8.2910156 17.039062 L 8.2714844 17 z "
                    }
                    style={{
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: "0px",
                    }}
                  />
                </g>
              </svg> 
              <span style={{ zIndex: 99}} className={styles.dsc}>Notifications</span>
        
              {/* <Image  alt="icon" className={u=== 'Notifications'?styles.navIcon+' '+styles.navyBorder:styles.navIcon}  src={notificationbell}/> */}
            </Link>
            {/* <span className={styles.dsc}>Notifications</span> */}
          </div>
          {visibleSearch === "invisible" ? (
            <>
              <div
                className={
                  styles.navIconContainer + " " + styles.searchiconContainer
                }
              >
                <button className={styles.searchiconBtn}>
                <svg
                  className={
                    styles.navIcon +
                    " " +
                    styles.searchicon +
                    " " +
                    styles.navNavy
                  }
                  onClick={openAndCloseSearch}
                  width="40"
                  height="40"
                  viewBox="0 0 281.25 281.25"
                  id="svg2"
                >
                  <defs id="defs4" />

                  <g id="layer1" transform="translate(6984.8564,-3994.3706)">
                    <path
                      d="m -6870.33,4034.1978 c -42.1151,0 -76.3568,34.24 -76.3568,76.355 0,42.115 34.2417,76.3568 76.3568,76.3568 19.9116,0 38.0562,-7.6621 51.6613,-20.1838 l 68.9209,67.7253 a 4.6875,4.6875 0 0 0 6.6266,-0.059 4.6875,4.6875 0 0 0 -0.057,-6.6284 l -68.9978,-67.8003 c 11.3396,-13.3272 18.2025,-30.5754 18.2025,-49.411 0,-42.115 -34.2418,-76.355 -76.3568,-76.355 z m 0,9.375 c 37.0484,0 66.9818,29.9316 66.9818,66.98 0,17.9973 -7.0771,34.3019 -18.5889,46.3256 a 4.6875,4.6875 0 0 0 -0.04,0.028 4.6875,4.6875 0 0 0 -0.031,0.048 c -12.1814,12.6839 -29.3078,20.5811 -48.3215,20.5811 -37.0484,0 -66.9818,-29.9334 -66.9818,-66.9818 0,-37.0484 29.9334,-66.98 66.9818,-66.98 z"
                      id="path5741"
                      style={{
                        fillOpacity: 10,
                        fillRule: "evenodd",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        inkscapeStroke: "none",
                      }}
                    />
                  </g>
                </svg>
                {/* <Image
                  className={styles.navIcon + " " + styles.searchicon + " " + styles.navNavy}
                  onClick={openAndCloseSearch}
                  alt="search icon"
                  src={searchicon}
                /> */}
                <span style={{ zIndex: 99 }} className={styles.dsc}>Search</span>
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          <div className={styles.burgerIconContainer}>
            {sidebar === "closed" ? (
              <>
                <span className={styles.dsc}>Open</span>
                <svg
                  className={styles.navIcon + " " + styles.navNavy}
                  onClick={openAndCloseSiderbar}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="navy"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  ></path>
                </svg>
                {/* <Image
                  className={styles.navIcon}
                  onClick={openAndCloseSiderbar}
                  alt="burger"
                  src={burger}
                /> */}
              </>
            ) : (
              <>
                <span
                  className={styles.dsc}
                  style={{
                    zIndex: 99
                  }}
                >
                  Close
                </span>
                <button
                  style={{ color: "navy" }}
                  className={styles.cancel}
                  onClick={openAndCloseSiderbar}
                >
                  ✕
                </button>
              </>
            )}
          </div>
          <div
            className={
              sidebar === "opened" ? styles.sidebarOpen : styles.sidebarClose
            }
          >
            <Sidebar />
          </div>
        </nav>
        {/* <div className={sidebar==='opened'?styles.sidebarOpen:styles.sidebarClose}><Sidebar/></div> */}
        <nav>
          <div
            ref={searchRef}
            className={
              visibleSearch === "visible"
                ? styles.searchContainer
                : styles.invisible
            }
          >
            {visibleSearch === "visible" ? (
              <button
                className={styles.closeSearch}
                onClick={openAndCloseSearch}
              >
                ╳
              </button>
            ) : (
              ""
            )}
            <input
              className={styles.searchInput}
              type="text"
              placeholder="What do you want to Search"
            />
            <button className={styles.searchButton}>Search</button>
          </div>
        </nav>
          {/* if then current path(page) is Notifications or
            Chat path the categories nav will not be visible
         */}
        {majorPath === "Chats" || majorPath === "Notifications" ? (
          ''
        ) : (
          <nav className={styles.navBtnContainer}>
            <div
              ref={path === "Chuksjohnleo" ? currentPath : homepath}
              className={styles.navBtnParent}
            >
              <Link
                href="/"
                className={
                  path === "Chuksjohnleo"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
                Home
              </Link>
            </div>
            <div
              ref={path === "News" ? currentPath : newspath}
              className={styles.navBtnParent}
            >
              <Link
                href="/news"
                className={
                  path === "News"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
                News
              </Link>
            </div>
            <div
              ref={path === "Politics" ? currentPath : politicspath}
              className={styles.navBtnParent}
            >
              <Link
                href="/politics"
                className={
                  path === "Politics"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
                Politics
              </Link>
            </div>
            <div
              ref={path === "Learning" ? currentPath : learningpath}
              className={styles.navBtnParent}
            >
              <Link
                href="/learning"
                className={
                  path === "Learning"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
                Learning
              </Link>
            </div>
            <div
              ref={path === "Religion" ? currentPath : religionpath}
              className={styles.navBtnParent}
            >
              <Link
                href="/religion"
                className={
                  path === "Religion"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
              Religion
              </Link>
            </div>
            <div
              ref={path === "Sports" ? currentPath : sportspath}
              className={styles.navBtnParent}
            >
              <Link
                href="/sports"
                className={
                  path === "Sports"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
                Sports
              </Link>
            </div>
            <div
              ref={path === "Stories" ? currentPath : storiespath}
              className={styles.navBtnParent}
            >
              <Link
                href="/stories"
                className={
                  path === "Stories"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
                Stories
              </Link>
            </div>
            <div
              ref={path === "History" ? currentPath : historypath}
              className={styles.navBtnParent}
            >
              <Link
                href="/history"
                className={
                  path === "History"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
                History
              </Link>
            </div>
            <div
              ref={path === "LoveAndFamily" ? currentPath : loveAndFamilypath}
              className={styles.navBtnParent}
            >
              <Link
                href="/love_and_family"
                className={
                  path === "LoveAndFamily"
                    ? styles.navBtn +" " + styles.specialNavBtn + " " + styles.navyBackground
                    : styles.navBtn +" "+ styles.specialNavBtn
                }
              >
                Love and Family
              </Link>
            </div>
            <div
              ref={path === "ScienceAndTechnology" ? currentPath : scienceAndTechnologypath}
              className={styles.navBtnParent}
            >
              <Link
                href="/science_and_technology"
                className={
                  path === "ScienceAndTechnology"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
               Science and Technology
              </Link>
            </div>
            <div
              ref={path === "PetsAndAnimals" ? currentPath : petsAndAnimalspath}
              className={styles.navBtnParent}
            >
              <Link
                href="/pets_and_animals"
                className={
                  path === "PetsAndAnimals"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
              Pets and Animals
              </Link>
            </div>
            <div
              ref={path === "Ict" ? currentPath : ictpath}
              className={styles.navBtnParent}
            >
              <Link
                href="/ict"
                className={
                  path === "Ict"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
             I.C.T
              </Link>
            </div>
            <div
              ref={path === "Health" ? currentPath : healthpath}
              className={styles.navBtnParent}
            >
              <Link
                href="/health"
                className={
                  path === "Health"
                    ? styles.navBtn + " " + styles.navyBackground
                    : styles.navBtn
                }
              >
              Health
              </Link>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
