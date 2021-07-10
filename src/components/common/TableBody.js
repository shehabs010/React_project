import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TableBody extends Component {
  cellContent = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  cellKey = (item, column) => (column.key ? column.key : column.path);

  td = (item, column) => (
    <td key={this.cellKey(item, column)} data-title={column.label}>
      {this.cellContent(item, column)}{' '}
    </td>
  );

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data &&
          data.map((item, i) => (
            <tr key={i}>{columns.map(column => (column.child ? column.child.map(column1 => this.td(item, column1)) : this.td(item, column)))}</tr>
          ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
};

export default TableBody;
