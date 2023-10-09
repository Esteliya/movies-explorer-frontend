import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {

    const { beChecked, onClickFilter } = props;

    return (
        <div className="switch">
            <input type="checkbox" className="checkbox hover-effect" defaultChecked={beChecked} onClick={onClickFilter} />
        </div >
    )
};

export default FilterCheckbox;