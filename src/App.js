import React, { useState, useEffect, useMemo } from 'react';
import './style.css';
export default function App() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );

        const responseData = await response.json();
        setData(responseData);
      } catch (er) {
        console.log(er);
      }
    };

    fetchTable();
  }, []);

  // let filteredData = data.filter((ele) => ele.name.match(inputText));
  let filteredData = useMemo(
    () =>
      data.filter((ele) =>
        ele.name.toLowerCase().includes(inputText.toLowerCase())
      ),
    [inputText]
  );

  if (inputText === '') {
    filteredData = data;
  }

  let content = filteredData.map((item) => (
    <tr>
      <td>{item.name}</td>
      <td>{item.company.name}</td>
      <td>{item.address.city}</td>
      <td>{item.website}</td>
    </tr>
  ));

  // https://jsonplaceholder.typicode.com/users
  // 1) Display api data in table
  // 2) Add Search Box and filter table data by Name with use memo

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company Name</th>
            <th>City</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
