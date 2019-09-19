import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({
  values,
  errors,
  touched,
  status,
  handleReset,
  handleSubmit
}) => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    if (status) {
      setUser([...users, status]);
    }
  }, [status]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Field type="text" name="username" placeholder="Name" />
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}
        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field
          type="password"
          className="food-select"
          name="password"
          autoComplete="cc-number"
          placeholder="password"
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <label className="container">
          Terms of Service
          <Field type="checkbox" name="term" checked={values.term} />
          <span className="checkmark"></span>
        </label>
        <div className="container">
          <button type="submit">Submit!</button>
          <button className="reset" onClick={handleReset} type="button">
            Reset
          </button>
        </div>
      </Form>
      {users.map(item => (
        <ul key={item.id}>
          <li>User:{item.username}</li>
          <li>Email:{item.email}</li>
          <li>Password:{item.password}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikUser = withFormik({
  mapPropsToValues({ username, email, password, term }) {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      term: term || false
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("You must put a name"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),
  handleSubmit(values, { setStatus }) {
    console.log(values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(UserForm);

export default FormikUser;
