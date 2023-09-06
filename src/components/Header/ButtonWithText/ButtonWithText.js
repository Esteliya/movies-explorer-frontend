import "./ButtonWithText.css";


function ButtonWithText(props) {
    const { text, onClick } = props;

    return (
        <button className="button-with-text hover-effect" name="Войти" onClick={onClick}>{text}</button>
    )
}
export default ButtonWithText;