import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    if (status) {
      setUser([...users, status]);
    }
  }, [users, status]);

  return (
    <div className="animal-form">
      <Form>
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
          placeholder="password"
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <label>
          Terms of Service
          <Field type="checkbox" name="term" checked={values.term} />
        </label>
        <button>Submit!</button>
      </Form>
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
  //You can use this to see the values
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(UserForm);

export default FormikUser;
