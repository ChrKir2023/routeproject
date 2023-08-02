
/*import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";*/
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import background from "./navona.jpg";
import ChangePassword from "./ChangePassword";

/*export default function Login() {*/

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Καθορίστηκε λανθασμένο όνομα χρήστη ή κωδικός πρόσβασης!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  
  const navigateChangePassword = () => {
        navigate("/ChangePassword");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
  <div style={{ backgroundImage: `url(${background})` }}> 
  
    <div className="col-md-12">
	 
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Όνομα χρήστη</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Κωδικός πρόσβασης</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
		  </div>
			&nbsp;
			&nbsp;
			<div id="openresetpage" class="align-to-right">
                 <a href='#' onClick={() => navigateChangePassword()}> Ξέχασα τον κωδικό πρόσβασης </a>
            </div>
			&nbsp;
			&nbsp;
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Σύνδεση</span>
            </button>
          </div>
			&nbsp;
			&nbsp;
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
	 </div> 
    </div>
  );
};

export default Login;