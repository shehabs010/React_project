import React from "react";
import "react-select2-wrapper/css/select2.css";
import "../topFilter/TopFilter.css";
import DropDownTopFilter from "../topFilter/DropDownTopFilter";

const TopFilter = ({ filters, data, selectedValue, cbChange }) => {

  const FiltersItems = filters.map((filter, i) => {
    return (
      <DropDownTopFilter
        key={i}
        Filter={filter}
        WideFieldData={data.WideField}
        NarrowFieldData={data.NarrowField}
        DetailedFieldData={data.DetailedField}
        WideFieldSelectedValue={selectedValue.WideField}
        NarrowFieldSelectedValue={selectedValue.NarrowField}
        DetailedFieldSelectedValue={selectedValue.DetailedField}
        onClick={cbChange}
      />
    );
  });
  return (
    <>
      <div className="topFilter row col-12 px-0 mx-0 mt-4 mb-5">
        {data.WideField.length && FiltersItems}
      </div>
    </>
  );

}

export default TopFilter;
