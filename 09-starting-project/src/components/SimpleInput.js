import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredInput, setEnteredInput] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouch, setEnteredNameTouch] = useState(false);

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouch(true);
    if (enteredInput.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);
    console.log(enteredInput);
    setEnteredInput('');
  };

  const nameInputIsInValid = !enteredNameIsValid && enteredNameTouch;
  const nameInputClasses = nameInputIsInValid ? 'form-control invalid' : 'form-control';
  return (
    <form onSubmit={submitFormHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={inputChangeHandler}
          value={enteredInput}
        />
      </div>
      {nameInputIsInValid && <p className="error-text">Name must not be empty.</p>}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
