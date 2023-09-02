import "./ButtonWithIcon.css";


function ButtonWithIcon(props) {
    const { text, icon } = props;

    return (
        <button className="button-with-text" name={text}>
            <p className="button-with-text__text">{text}</p>
            <div className="button-with-text__icon" style={{ backgroundImage: `url(${icon})` }}/>
            </button>
    )
}
export default ButtonWithIcon;