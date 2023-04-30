import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ records, selectedRecord, setRecords, setIsEditing }) => {
  const id = selectedRecord.id;

  const [firstName, setFirstName] = useState(selectedRecord.firstName);
  const [lastName, setLastName] = useState(selectedRecord.lastName);
  const [email, setEmail] = useState(selectedRecord.email);
  const [contact, setContact] = useState(selectedRecord.contact);

  const handleUpdate = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !contact) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const record = {
      id,
      firstName,
      lastName,
      email,
      contact,
    };

    for (let i = 0; i < records.length; i++) {
      if (records[i].id === id) {
        records.splice(i, 1, record);
        break;
      }
    }

    localStorage.setItem('records_data', JSON.stringify(records));
    setRecords(records);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${record.firstName} ${record.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Record</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="contact">Contact</label>
        <input
          id="contact"
          type="number"
          name="contact"
          value={contact}
          onChange={e => setContact(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
