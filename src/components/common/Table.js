import PropTypes from 'prop-types';
import React from 'react';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({ columns, onSort, columnSort, data }) => (
  <table className="table">
    <TableHeader columns={columns} onSort={onSort} columnSort={columnSort} />
    <TableBody data={data} columns={columns} />
  </table>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  onSort: PropTypes.func,
  columnSort: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
