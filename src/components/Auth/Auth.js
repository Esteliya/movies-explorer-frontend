import { Link } from "react-router-dom";
import "./Auth.css"
import Logo from "../Logo/Logo";


function Auth(props) {
    const { title, children, btnText, titleLink, textLink, link, onClick, disabled, onSubmit } = props;

    const classButton = disabled ? "auth__button auth__button_disable" : "auth__button hover-effect"

    return (
        <section className="auth">
            <div className="auth__format-form">
                <div className="auth__format-element">
                    <Logo />
                    <form className="auth__form" id={btnText} noValidate onSubmit={onSubmit}>
                        <h1 className="auth__title">{title}</h1>
                        {children}
                    </form>
                </div>
                <div className="auth__format-element">
                    <button
                        type="submit"
                        className={classButton}
                        form={btnText}
                        onClick={onClick}
                        disabled={disabled}>
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