import "./ItemFormProfile.css";

function ItemFormProfile(props) {
    const { labelInput, placeholder, onChange, disabled, typeInput, minLength, maxLength, value, form } = props;

    return (
        <fieldset className="item-form-profile">
            <label className="item-form-profile__label" >{labelInput}</label>
            <input className="item-form-profile__input focus-effect" form={form} disabled={disabled} placeholder={placeholder} value={value} onChange={onChange} type={typeInput} minLength={minLength} maxLength={maxLength}></input>
        </fieldset>
    )
};

export default ItemFormProfile;