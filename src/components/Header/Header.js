import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Header.css";
import Navigate from "./Navigate/Navigate";


function Header(props) {
    const { openButton, onClickAccount, window, loggedIn } = props;
    const location = useLocation();//будем следить за роутами
    // домашняя страница (меняем фон шапки)
    const homepage = location.pathname === '/';
    const styleHeader = homepage ? "header header_home" : "header";
    // страницы с контентом
    const routeContent = location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile' || location.pathname === '/';

    return (
        <>
            {routeContent && <header className={styleHeader}>
                <Navigate window={window} homepage={homepage} openButton={openButton} onClickAccount={onClickAccount} loggedIn={loggedIn} />
            </header>}
        </>

    )
};

export default Header;