import "./ButtonWithIcon.css";

function ButtonWithIcon(props) {
    const { text, icon, onClick, homepage } = props;

    // стиль cлоя кнопки Аккаунт (замена фона для домашней страницы)
    const styleButton = homepage ? "button-with-icon button-with-icon_home hover-effect" : "button-with-icon hover-effect";
    const styleIcon = homepage ? "button-with-icon__icon button-with-icon__icon_home" : "button-with-icon__icon";


    return (
            <button type="button" className={styleButton} name={text} onClick={onClick}>{text}
            <img src={`${icon}`} alt={text} className={styleIcon}/>
            </button>
    )
}
export default ButtonWithIcon;