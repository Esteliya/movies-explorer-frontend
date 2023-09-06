import React from 'react';
import "./Header.css";
import Cover from "./Cover/Cover"
import Navigate from "./Navigate/Navigate";

function Header(props) {
    const { openButton, onClickAccount, homepage = false } = props;

    // проверим размер экрана - если мобилное устройство, то в header меняем кнопку
    const [withWindow, setwithWindow] = React.useState(window.innerWidth);
    React.useEffect(() => {
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
                <Navigate mobile={withWindow} homepage={homepage} openButton={openButton} onClickAccount={onClickAccount} />
            </header>
            {homepage && <Cover />}
        </>

    )
}
export default Header;