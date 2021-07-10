import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TableHeader extends Component {
  onRaisSort = (event, path) => {
    event.preventDefault();
    let { columnSort, onSort } = this.props;
    columnSort = { ...columnSort };

    if (columnSort.path === path) {
      columnSort.order = columnSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      columnSort.path = path;
      columnSort.order = 'asc';
    }
    onSort(columnSort);
  };

  columnSortIcon = column => {
    const { columnSort } = this.props;
    if (!column.isSort) return;
    if (columnSort && column.path !== columnSort.path)
      return (
        <>
          <i className="sort-icon sort-asc" />
          <i className="sort-icon sort-desc" />
        </>
      );
    if (columnSort && columnSort.order === 'asc') return <i className="sort-icon sort-asc" />;
    return <i className="sort-icon sort-desc" />;
  };

  th = column => (
    <th key={column.path || column.key} colSpan={column.child ? column.child.length : ''} rowSpan={!column.child ? 2 : ''}>
      {column.isSort && (
        <a href="/" className="d-flex align-items-center" onClick={e => this.onRaisSort(e, column.path)}>
          {!column.child && <span className="d-inline-flex flex-column mr-1">{this.columnSortIcon(column)}</span>}
          <span>{column.label}</span>
        </a>
      )}
      {!column.isSort && (
        <div className="d-flex align-items-center">
          <span>{column.label}</span>
        </div>
      )}
    </th>
  );

  render() {
    const { columns } = this.props;
    const thead = columns.map(column => this.th(column));
    const child = columns.map(column => column.child && column.child.map(column1 => this.th(column1)));

    return (
      <thead>
        <tr className="clickable">{thead}</tr>
        {child && child.length && <tr className="clickable">{child}</tr>}
      </thead>
    );
  }
}

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  columnSort: PropTypes.string,
  onSort: PropTypes.func,
};
export default TableHeader;
