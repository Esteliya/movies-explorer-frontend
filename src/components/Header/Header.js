// import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./Header.css";
// import headerLogo from "../../image/header__logo.svg";//лого
import Cover from "./Cover/Cover"
import Navigate from "./Navigate/Navigate";

function Header(props) {
    const { homepage = false } = props;

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

    return (
        <>
            <header className={styleHeader}>
                <Navigate mobile={withWindow} homepage={homepage}/>
            </header>
            {homepage && <Cover />}
        </>

    )
}
export default Header;