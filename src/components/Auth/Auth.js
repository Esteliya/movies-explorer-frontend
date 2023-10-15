import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import Logo from "../Logo/Logo";

function Auth(props) {
    const { title, children, nameForm, btnText, titleLink, textLink, link, onClick, isValid, onSubmit } = props;

    // состояние кнопки
    const [disabledButton, setDisabledButton] = React.useState(true);
    // css-стили кнопки
    const classButton = disabledButton ? "auth__button auth__button_disable" : "auth__button hover-effect";

    React.useEffect(() => {
        handleDisableButton();
    }, [isValid]);

    // ОБРАБОТЧИК КНОПКИ 
    function handleDisableButton() {
        if (isValid) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        };
    };

    return (
        <section className="auth">
            <div className="auth__format-form">
                <div className="auth__format-element">
                    <Logo />
                    <form className="auth__form" id={nameForm} noValidate onSubmit={onSubmit}>
                        <h1 className="auth__title">{title}</h1>
                        {children}
                    </form>
                </div>
                <div className="auth__format-element">
                    <button
                        type="submit"
                        className={classButton}
                        form={nameForm}
                        onClick={onClick}
                        disabled={disabledButton}>
                        {btnText}
                    </button>
                    <p className="auth__route">{titleLink}
                        <Link to={link} name={textLink} className="auth__link hover-effect">{textLink}
                        </Link></p>
                </div>
            </div>
        </section>

    )
};

export default Auth;