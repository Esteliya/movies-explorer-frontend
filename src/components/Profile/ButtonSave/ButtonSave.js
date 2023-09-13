import "./ButtonSave.css";


function ButtonSave(props) {
    const { onClick } = props;

    return (
        <button type="submit" className="button-save hover-effect" name="Сохранить" onClick={onClick}>Cохранить</button>
    )
}
export default ButtonSave;