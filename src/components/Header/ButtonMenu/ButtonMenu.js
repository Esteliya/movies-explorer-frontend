import "./ButtonMenu.css";
import "../../../mixStile/hoverEffect.css";


function ButtonMenu(props) {
    const { homepage, onClick } = props;

    // стиль cлоя кнопки Аккаунт (замена фона для домашней страницы)
    const styleButton = homepage ? "button-menu button-menu_home hover-effect" : "button-menu hover-effect";

    return (
        <button type="button" className={styleButton} name="Меню" onClick={onClick} />
    )
};

export default ButtonMenu;