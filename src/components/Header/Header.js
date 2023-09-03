// import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./Header.css";
// import headerLogo from "../../image/header__logo.svg";//лого
import Cover from "./Cover/Cover"
import Navigate from "./Navigate/Navigate";

function Header(props) {
    const { loggedIn, homepage = false } = props;

    // const navigate = useNavigate();
    
    // проверим размер экрана - если мобилное устройство, то в header меняем кнопку
    const [withWindow, setwithWindow] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setwithWindow(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const styleHeader = homepage ? "header header_home" : "header";
    const styleMenu = !loggedIn ? "header__menu header__menu_home" : "header__menu";

    // пререход на страницу авторизации - на функционале перенести 
/*     function passPageLogin() {
        navigate('/signin', {
            replace: true
        })
    } */

    // пререход на страницу данных пользователя - на функционале перенести 
/*     function passPageProfile() {
        navigate('/profile', {
            replace: true
        })
    }
 */
    return (
        <>
            <header className={styleHeader}>
                <Navigate mobile={withWindow} />
            </header>
            {homepage && <Cover />}
        </>

    )
}
export default Header;