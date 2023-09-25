import "./FilterCheckbox.css";

function FilterCheckbox(props) {

    const { onClickFilter } = props;

    return (
        <div className="switch">
            <input type="checkbox" className="checkbox hover-effect" onClick={onClickFilter}/>
        </div >
    )
}
export default FilterCheckbox;