import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { recordsData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [records, setRecords] = useState(recordsData);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('records_data'));
    if (data !== null && Object.keys(data).length !== 0) setRecords(data);
  }, []);

  const handleEdit = id => {
    const [record] = records.filter(record => record.id === id);

    setSelectedRecord(record);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [record] = records.filter(record => record.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${record.firstName} ${record.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const recordsCopy = records.filter(record => record.id !== id);
        localStorage.setItem('records_data', JSON.stringify(recordsCopy));
        setRecords(recordsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            records={records}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          records={records}
          setRecords={setRecords}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          records={records}
          selectedRecord={selectedRecord}
          setRecords={setRecords}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
