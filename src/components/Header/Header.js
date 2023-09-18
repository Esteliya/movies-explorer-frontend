import React from 'react';
import "./Header.css";
import Navigate from "./Navigate/Navigate";

function Header(props) {
    const { openButton, onClickAccount, mobile, homepage = false, loggedIn } = props;


    const styleHeader = homepage ? "header header_home" : "header";


    return (
        <>
            <header className={styleHeader}>
                <Navigate mobile={mobile} homepage={homepage} openButton={openButton} onClickAccount={onClickAccount} loggedIn={loggedIn}/>
            </header>
        </>

    )
}
export default Header;