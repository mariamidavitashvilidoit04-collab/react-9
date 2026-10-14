import { useState } from "react";
import "./App.css";

function validate({ email, password }) {
  const errors = {};
  if (email.trim() === "") {
    errors.email = " შეიყვანეთ ელ-ფოსტა";
  } else if (!email.includes("@")) {
    errors.email = " ელ-ფოსტა უნდა შეიცავდეს @ სიმბოლოს";
  }

  if (password === "") {
    errors.password = " შეიყვანეთ პაროლი";
  } else if (password.length < 8) {
    errors.password = " პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო";
  }

  return errors;
}

function App() {
  const [Values, setValues] = useState({ email: "", password: "" });
  const [Touched, setTouched] = useState({ email: false, password: false });

  const errors = validate(Values);
  const hasErrors = Object.keys(errors).length > 0;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasErrors) {
      setTouched({ email: true, password: true });
      return;
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>რეგისტრაცია</h2>

      <div className="field">
        <label htmlFor="email">ელ-ფოსტა</label>
        <input
          id="email"
          name="email"
          type="email"
          value={Values.email}
          onChange={handleChange}
          className={Touched.email && errors.email ? "error" : ""}
        />
        {Touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={Values.password}
          onChange={handleChange}
          className={Touched.password && errors.password ? "invalid" : ""}
        />
        {Touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>

      <button type="submit" disabled={hasErrors}>
        რეგისტრაცია
      </button>
    </form>
  );
}

export default App;
