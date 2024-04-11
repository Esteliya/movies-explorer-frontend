import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {

    const { beChecked, onClickFilter, onChangeFilter } = props;

    return (
        <div className="switch">
            <input 
            type="checkbox" 
            className="checkbox hover-effect" 
            defaultChecked={beChecked} 
            onClick={onClickFilter} 
            onChange={onChangeFilter}/>
        </div >
    )
};

export default FilterCheckbox;