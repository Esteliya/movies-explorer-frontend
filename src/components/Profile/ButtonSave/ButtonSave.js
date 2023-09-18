import "./ButtonSave.css";
import "../../../mixStile/buttonDisable.css"


function ButtonSave(props) {
    const { onClick, disabled, form } = props;

    const disableClass = disabled? "button_disable button-save" : "button-save hover-effect"

    return (
        <button type="submit" className={disableClass} name="Сохранить" onClick={onClick} form={form}>Cохранить</button>
    )
}
export default ButtonSave;