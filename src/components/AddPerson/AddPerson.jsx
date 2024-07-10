// src/components/AddPerson.js
import React, { useState, useEffect } from 'react';

function AddPerson() {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState({});

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now(), name: '', dob: '', aadhar: '', mobile: '', age: '' }]);
  };

  const handleSave = (id) => {
    const row = rows.find(row => row.id === id);
    if (!row.name || !row.dob || !row.aadhar || !row.mobile) {
      alert('All fields are required.');
      return;
    }
    if (row.aadhar.length !== 12) {
      alert('Aadhar Number should be 12 digits.');
      return;
    }
    if (row.mobile.length !== 10) {
      alert('Mobile Number should be 10 digits.');
      return;
    }

    const updatedRows = rows.map(row => row.id === id ? { ...row, saved: true } : row);
    setRows(updatedRows);
    const newData = [...data, row];
    setData(newData);
    localStorage.setItem('persons', JSON.stringify(newData));
  };

  const handleDelete = (id) => {
    const row = rows.find(row => row.id === id);
    if (row.saved) {
      const newData = data.filter(d => d.id !== id);
      setData(newData);
      localStorage.setItem('persons', JSON.stringify(newData));
    }
    setRows(rows.filter(row => row.id !== id));
  };

  const handleChange = (id, field, value) => {
    const updatedRows = rows.map(row => row.id === id ? { ...row, [field]: value, age: field === 'dob' ? calculateAge(value) : row.age } : row);
    setRows(updatedRows);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('persons')) || [];
    setData(storedData);
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td><input type="text" value={row.name} onChange={(e) => handleChange(row.id, 'name', e.target.value)} /></td>
              <td><input type="date" value={row.dob} onChange={(e) => handleChange(row.id, 'dob', e.target.value)} /></td>
              <td><input type="text" value={row.aadhar} onChange={(e) => handleChange(row.id, 'aadhar', e.target.value)} /></td>
              <td><input type="text" value={row.mobile} onChange={(e) => handleChange(row.id, 'mobile', e.target.value)} /></td>
              <td>{row.age}</td>
              <td>
                <button onClick={() => handleSave(row.id)}>Save</button>
                <button onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add New Person</button>
    </div>
  );
}

export default AddPerson;
