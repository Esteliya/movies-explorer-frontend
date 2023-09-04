import "./ButtonWithIcon.css";

function ButtonWithIcon(props) {
    const { text, icon, onClick, homepage } = props;

    // стиль cлоя кнопки Аккаунт (замена фона для домашней страницы)
    const styleButton = homepage ? "button-with-icon button-with-icon_home" : "button-with-icon";


    return (
        <>
            <button className={styleButton} name={text} onClick={onClick}>
                <p className="button-with-icon__text">{text}</p>
                <div className="button-with-icon__icon" style={{ backgroundImage: `url(${icon})` }} />
            </button>
        </>

    )
}
export default ButtonWithIcon;