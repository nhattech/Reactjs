import React from 'react';

import classes from './UserList.module.css';
import Card from '../UI/Card';

const UserList = (props) => {
  return (
    <Card cssClass={classes.users}>
      <ul>
        {props.users.map((user) => {
          return (
            <li key={user.id}>
              {user.username} ({user.age} years old)
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default UserList;
