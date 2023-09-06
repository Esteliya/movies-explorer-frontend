import "./ButtonSave.css";


function ButtonSave(props) {
    const { onClick } = props;

    return (
        <button className="button-save hover-effect" name="Сохранить" onClick={onClick}>Cохранить</button>
    )
}
export default ButtonSave;