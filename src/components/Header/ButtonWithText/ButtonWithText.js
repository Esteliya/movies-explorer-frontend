import "./ButtonWithText.css";


function ButtonWithText(props) {
    const { text } = props;

    return (
        <button className="button-with-text" name="Войти">{text}</button>
    )
}
export default ButtonWithText;