import React from "react";
import "../topFilter/TopFilter.css";

const RadioFilter = ({ name, data, valueText, valuePropery, selectedValue, onSelect }) => {
    let options = [];
    options =
        data &&
        data.map((dt) => ({
            label: dt[valueText],
            value: dt[valuePropery],
        }));

    //  (name !== "college") && (options.length > 1) && options.unshift({ label: "عرض الكل", value: "1" });

    return (
        <>
            <div className="radioTopFilter row mx-0 col-12 mb-3 px-0">
                <div className="radioTopFilter__items">
                    {options && options.map((op, i) =>
                        <div key={i} className="radioTopFilter__radio">
                            <input type="radio" value={op.value} name={name} id={`${name}_${i + 1}`} onChange={onSelect} checked={selectedValue === op.value} />
                            <label>{op.label}</label>
                        </div>
                    )}

                </div>
            </div>


        </>
    );
};

RadioFilter.defaultProps = {
    valueText: "name",
    valuePropery: "id"
}

export default RadioFilter;
