import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UserList from './components/Users/UserList';

import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const addUserHandler = (user) => {
    setUsers((prevUsers) => {
      return [...prevUsers, user];
    });
  };
  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UserList users={users} />
    </div>
  );
}

export default App;
