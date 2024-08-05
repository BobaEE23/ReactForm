import "./App.css";
import { useState, useRef } from "react";
import * as yup from "yup";

const sendData = ({ email, pass }) => {
  console.log(email, pass);
};

const emailChangesSchema = yup
  .string()
  .matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    "Неверный email. Допустимые символы: буквы, цифры и нижнее подчёркивание"
  );

const validateAndGetErrorMessage = (schema, value) => {
  let errorMessage = null;

  try {
    schema.validateSync(value);
  } catch ({ errors }) {
    errorMessage = errors
      .reduce((message, error) => message + error + "n", "")
      .trim();
  }

  return errorMessage;
};

export const App = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [error, setError] = useState(null);
  const submitButtonRef = useRef(null);

  const onEmailChange = ({ target }) => {
    setEmail(target.value);
    const newError = validateAndGetErrorMessage(
      emailChangesSchema,
      target.value
    );
    setError(newError);
  };

  const onPassChange = ({ target }) => {
    setPass(target.value);
    setError(null);
  };

  const onRepeatPassChange = ({ target }) => {
    setRepeatPass(target.value);
    setError(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    pass === repeatPass
      ? sendData({ email, pass })
      : setError("Введенные пароли не совпадают");
  };
  const onBlur = () => {
    submitButtonRef.current.focus();
  };

  return (
    <div className="App">
      <h1>Регистрация</h1>
      <form onSubmit={onSubmit}>
        {error && <div>{error}</div>}
        <div>
          <p>Email</p>
          <input
            onMouseLeave={onBlur}
            onChange={onEmailChange}
            type="email"
          ></input>
        </div>

        <div>
          <p>Password</p>
          <input
            onMouseLeave={onBlur}
            onChange={onPassChange}
            type="password"
          ></input>
        </div>

        <div>
          <p>repeat password</p>
          <input
            onMouseLeave={onBlur}
            onChange={onRepeatPassChange}
            type="password"
          ></input>
        </div>

        <button
          ref={submitButtonRef}
          disabled={error}
          onClick={() => sendData(email, pass)}
          type="submit"
        >
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
};
