import "./ButtonWithIcon.css";


function ButtonWithIcon(props) {
    const { text, icon, onClick } = props;

    return (
        <>
            <button className="button-with-icon" name={text} onClick={onClick}>
                <p className="button-with-icon__text">{text}</p>
                <div className="button-with-icon__icon" style={{ backgroundImage: `url(${icon})` }} />
            </button>
        </>

    )
}
export default ButtonWithIcon;