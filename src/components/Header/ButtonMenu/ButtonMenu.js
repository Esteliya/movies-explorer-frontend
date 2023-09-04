import "./ButtonMenu.css";


function ButtonMenu(props) {
    const { homepage } = props;

    // стиль cлоя кнопки Аккаунт (замена фона для домашней страницы)
    const styleButton = homepage ? "button-menu button-menu_home" : "button-menu";

    return (
        <button className={styleButton} name="Меню" />
    )
}
export default ButtonMenu;