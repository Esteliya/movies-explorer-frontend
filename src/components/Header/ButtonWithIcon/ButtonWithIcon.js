import "./ButtonWithIcon.css";

function ButtonWithIcon(props) {
    const { text, icon, onClick, homepage } = props;

    // стиль cлоя кнопки Аккаунт (замена фона для домашней страницы)
    const styleButton = homepage ? "button-with-icon button-with-icon_home hover-effect" : "button-with-icon hover-effect";
    const styleIcon = homepage ? "button-with-icon__icon button-with-icon__icon_home hover-effect" : "button-with-icon__icon hover-effect";


    return (
            <button className={styleButton} name={text} onClick={onClick}>
                <p className="button-with-icon__text">{text}</p>
                <div className={styleIcon} style={{ backgroundImage: `url(${icon})` }} />
            </button>
    )
}
export default ButtonWithIcon;