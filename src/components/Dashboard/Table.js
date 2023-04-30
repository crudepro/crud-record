import React from 'react';

const Table = ({ records, handleEdit, handleDelete }) => {
  records.forEach((record, i) => {
    record.id = i + 1;
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record, i) => (
              <tr key={record.id}>
                <td>{i + 1}</td>
                <td>{record.firstName}</td>
                <td>{record.lastName}</td>
                <td>{record.email}</td>
                <td>{record.contact}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(record.id)}
                    className="button muted-button" id="editButton"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="button muted-button" id="deleteButton"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Record</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
