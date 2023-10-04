import "./ItemForm.css"
import "../../mixStile/focusEffect.css";


function ItemForm(props) {
    const { label, type, name, pattern, value, placeholder, minLength, maxLength, onChange, textError } = props;

    return (
        <fieldset className="item-form">
            <label className="item-form__label">{label}</label>
            <input className="item-form__input focus-effect"
                type={type}
                name={name}
                required
                pattern={pattern}
                value={value}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                onChange={onChange}></input>
            <span className="item-form__mistake">{textError}</span>
        </fieldset>

    )
}
export default ItemForm;