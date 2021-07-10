/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';

function FilterItem({ name, value, label, onSelect, type, selectedValue }) {
  return (
    <div className={`filter__${type}`}>
      {type === 'radio' && <input type="radio" name={name} id={name} value={value} onChange={onSelect} checked={selectedValue === value} />}
      {type !== 'radio' && (
        <input type="checkbox" name={name} id={name} value={value} onChange={onSelect} checked={selectedValue.some(v => v === value)} />
      )}
      <label>{label}</label>
    </div>
  );
}

FilterItem.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  type: PropTypes.string,
  selectedValue: PropTypes.any,
};
export default FilterItem;
