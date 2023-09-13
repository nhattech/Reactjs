import React, { Fragment, useState } from 'react';

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
    <Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UserList users={users} />
    </Fragment>
  );
}

export default App;
