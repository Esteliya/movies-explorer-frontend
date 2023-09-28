import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {

    const { beChecked, onClickFilter } = props;

    //const [isChecked, setIsChecked] = React.useState(false);

/*     function onClickFilter() {
        //setIsChecked(!isChecked);// тоггл
        if (beChecked) {// если чекнули 
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }; */

    return (
        <div className="switch">
            <input type="checkbox" className="checkbox hover-effect" defaultChecked={beChecked} onClick={onClickFilter} />
        </div >
    )
}
export default FilterCheckbox;