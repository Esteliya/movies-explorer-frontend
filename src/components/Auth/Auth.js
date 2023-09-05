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
                        <h2 className="auth__title">{title}</h2>
                        {children}
                        {/* <button type="submit" className="auth__button" style={{marginTop: `${margin}px`}} onClick={onClick}>{btnText}</button> */}
                    </form>
                </div>
                <div className="auth__format-element">
                    <button type="submit" className="auth__button" form={btnText} onClick={onClick}>{btnText}</button>
                    <p className="auth__route">{titleLink} <Link to={link} name={textLink} className="auth__link">{textLink}</Link></p>
                </div>
            </div>


        </section>

    )
}
export default Auth;