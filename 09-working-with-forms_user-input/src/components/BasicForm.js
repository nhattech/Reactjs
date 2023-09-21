import useInput from '../hooks/use-input';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const BasicForm = (props) => {
  const {
    value: enteredFName,
    isValid: enteredFNameIsValid,
    hasError: fnameInputHasError,
    valueChangeHandler: fnameInputChangeHandler,
    inputBlurHandler: fnameInputBlurHandler,
    reset: resetFNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredLName,
    isValid: enteredLNameIsValid,
    hasError: lnameInputHasError,
    valueChangeHandler: lnameInputChangeHandler,
    inputBlurHandler: lnameInputBlurHandler,
    reset: resetLNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const fnameInputClasses = fnameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const lnameInputClasses = lnameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  let formIsValid = false;
  if (enteredFNameIsValid && enteredLNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      return;
    }

    console.log(enteredFName, enteredLName, enteredEmail);
    resetFNameInput();
    resetLNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={fnameInputClasses}>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={enteredFName}
            onChange={fnameInputChangeHandler}
            onBlur={fnameInputBlurHandler}
          />
          {fnameInputHasError && (
            <p className="error-text">First Name must not be empty</p>
          )}
        </div>

        <div className={lnameInputClasses}>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={enteredLName}
            onChange={lnameInputChangeHandler}
            onBlur={lnameInputBlurHandler}
          />
          {lnameInputHasError && (
            <p className="error-text">Last Name must not be empty</p>
          )}
        </div>
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
