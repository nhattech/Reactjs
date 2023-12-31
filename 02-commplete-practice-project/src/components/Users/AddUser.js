import React, { useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddUser.module.css';
import Helper from '../Helpers/Helper';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();
  //... ref read infor from DOM
  const uname = useRef();
  const uage = useRef();
  //...

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid',
        message: 'Please enter username or age',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please check age (>1)',
      });
      return;
    }

    props.onAddUser({
      id: Math.random().toString(),
      // username: enteredUsername,
      username: uname.current.value,
      // age: enteredAge,
      age: uage.current.value,
      // });
    });

    setEnteredUsername('');
    setEnteredAge('');
    // setError(null)
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <Helper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          confirm={errorHandler}
        />
      )}
      <Card cssClass={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            ref={uname}
          />
          <label htmlFor="age">Age(years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
            ref={uage}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Helper>
  );
};

export default AddUser;
