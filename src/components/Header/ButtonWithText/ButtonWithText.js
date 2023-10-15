import "./ButtonWithText.css";


function ButtonWithText(props) {
    const { text, onClick } = props;

    return (
        <button type="button" className="button-with-text hover-effect" name="Войти" onClick={onClick}>{text}</button>
    )
};

export default ButtonWithText;