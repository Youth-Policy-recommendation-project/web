import React from 'react';

const TableRow = ({ title, value }) => {
  return (
    <tr>
      <td className="table-cell">{title}</td>
      <td className="table-cell">{value}</td>
    </tr>
  );
};

export default TableRow;