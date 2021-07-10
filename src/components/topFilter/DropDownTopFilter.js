import React from "react";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import "../topFilter/TopFilter.css";

const DropDownTopFilter = (props, Value, Data) => {
  if (props.Filter.id === "1") {
    Value = props.WideFieldSelectedValue;
    Data = props.WideFieldData;
  } else if (props.Filter.id === "2") {
    Value = props.NarrowFieldSelectedValue;
    Data = props.NarrowFieldData;
  } else {
    Value = props.DetailedFieldSelectedValue;
    Data = props.DetailedFieldData;
  }
  let options = [];
  options =
    Data &&
    Data.map((d) => ({
      text: d.nameAr,
      id: d.code,
    }));
  options.unshift({ text: "عرض الكل", id: "1" });
  return (
    <>
      <div className="col-12 col-md-4">
        <label className="topFilter__title">{props.Filter.title}</label>
        {options && (
          <Select2
            defaultValue={0} // or as string | array
            className="select222"
            id={props.Filter.id}
            value={Value}
            data={options}
            options={{
              //placeholder: "عرض الكل",
              minimumResultsForSearch: 10,
              language: "ar",
              dir: "rtl",
            }}
            onChange={props.onClick}
          />
        )}
        <label className="topFilter__title">{props.Filter.title}</label>
      </div>
    </>
  );
};

export default DropDownTopFilter;
