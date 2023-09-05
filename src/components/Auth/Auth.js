import { Link } from "react-router-dom";
import "./Auth.css"
import Logo from "../Logo/Logo";


function Auth(props) {
    const { title, children, btnText, titleLink, textLink, link, margin, onClick } = props;

    return (
        <section className="auth">
            <Logo />
            <form className="auth__form">
                <h2 className="auth__title">{title}</h2>
                {children}
                {/* <button type="submit" className="auth__button" style={{marginTop: `${margin}px`}} onClick={onClick}>{btnText}</button> */}
            </form>
            <button type="submit" className="auth__button" style={{marginTop: `${margin}px`}} onClick={onClick}>{btnText}</button>
            <p className="auth__route">{titleLink} <Link to={link} name={textLink} className="auth__link">{textLink}</Link></p>
        </section>

    )
}
export default Auth;