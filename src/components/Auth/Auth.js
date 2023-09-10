import { Link } from "react-router-dom";
import "./Auth.css"
import Logo from "../Logo/Logo";


function Auth(props) {
    const { title, children, btnText, titleLink, textLink, link, onClick } = props;

    return (
        <section className="auth">
            <div className="auth__format-form">
                <div className="auth__format-element">
                    <Logo />
                    <form className="auth__form" id={btnText}>
                        <h1 className="auth__title">{title}</h1>
                        {children}
                    </form>
                </div>
                <div className="auth__format-element">
                    <button type="submit" className="auth__button hover-effect" form={btnText} onClick={onClick}>{btnText}</button>
                    <p className="auth__route">{titleLink} <Link to={link} name={textLink} className="auth__link hover-effect">{textLink}</Link></p>
                </div>
            </div>
        </section>

    )
}
export default Auth;