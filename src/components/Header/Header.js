import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Header.css";
import Navigate from "./Navigate/Navigate";


function Header(props) {
    const { openButton, onClickAccount, mobile, loggedIn } = props;
    const location = useLocation();//будем следить за роутами
    // домашняя страница (меняем фон шапки)
    const homepage = location.pathname === '/';
    const styleHeader = homepage ? "header header_home" : "header";
    // страницы с контентом
    const routeContent = location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile' || location.pathname === '/';

    // отслеживаем свой роут
    React.useEffect(() => {
        console.log('Current location is ', location.pathname);
        console.log(routeContent)
    }, [location]);

    return (
        <>
            {routeContent && <header className={styleHeader}>
                <Navigate mobile={mobile} homepage={homepage} openButton={openButton} onClickAccount={onClickAccount} loggedIn={loggedIn} />
            </header>}
        </>

    )
}
export default Header;