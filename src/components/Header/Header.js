import React from 'react';
import "./Header.css";
import Navigate from "./Navigate/Navigate";

function Header(props) {
    const { openButton, onClickAccount, mobile, homepage = false } = props;


    const styleHeader = homepage ? "header header_home" : "header";


    return (
        <>
            <header className={styleHeader}>
                <Navigate mobile={mobile} homepage={homepage} openButton={openButton} onClickAccount={onClickAccount} />
            </header>
        </>

    )
}
export default Header;