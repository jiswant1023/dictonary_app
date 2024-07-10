// src/components/RetrieveInfo.js
import React, { useState, useEffect } from 'react';

function RetrieveInfo() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('persons')) || [];
    setData(storedData);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = data.find(person => person.aadhar === query);
    setResult(match || 'No match found');
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Aadhar Number:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={12}
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {result ? (
        typeof result === 'string' ? (
          <p>{result}</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Aadhar Number</th>
                <th>Mobile Number</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.name}</td>
                <td>{result.dob}</td>
                <td>{result.aadhar}</td>
                <td>{result.mobile}</td>
                <td>{result.age}</td>
              </tr>
            </tbody>
          </table>
        )
      ) : (
        <p>Enter an Aadhar Number to search for a match.</p>
      )}
    </div>
  );
}

export default RetrieveInfo;
