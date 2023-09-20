import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredInput, setEnteredInput] = useState('');

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(enteredInput);
    setEnteredInput('');
  };
  return (
    <form onSubmit={submitFormHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={inputChangeHandler}
          value={enteredInput}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
