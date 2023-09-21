import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredInput, setEnteredInput] = useState('');
  const [enteredNameTouch, setEnteredNameTouch] = useState(false);

  const enteredNameIsValid = enteredInput.trim() !== '';
  const nameInputIsInValid = !enteredNameIsValid && enteredNameTouch;

  const nameInputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouch(true);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouch(true);
    
    if(!enteredNameIsValid) {
      return;
    }
    console.log(enteredInput);
    setEnteredInput('');
    setEnteredNameTouch(false);

  };

  const nameInputClasses = nameInputIsInValid
    ? 'form-control invalid'
    : 'form-control';
  return (
    <form onSubmit={submitFormHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredInput}
        />
      </div>
      {nameInputIsInValid && (
        <p className="error-text">Name must not be empty.</p>
      )}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
