import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        H τιμή είναι απαραίτητη!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Δεν είναι σωστή μορφή email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Το όνομα χρήστη πρέπει να είναι μεταξύ 6 και 20 χαρακτήρων.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
		Ο κωδικός πρόσβασης πρέπει να είναι μεταξύ 6 και 40 χαρακτήρων.
      </div>
    );
  }
};

const vverifypassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Ο κωδικός πρόσβασης πρέπει να είναι μεταξύ 6 και 40 χαρακτήρων.
      </div>
    );
  }
};


const ChangePassword = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  
  const onChangeVerifyPassword = (e) => {
    const verifyPassword = e.target.value;
    setVerifyPassword(verifyPassword);
  };
 
  const handleChangePassword = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0
	   && (password === verifyPassword)) {
		console.log("Within web service call! ");
		  AuthService.changepassword(username, email, password).then(
			(response) => {
				console.log("Correct ");
			  setMessage(response.data.message);
			  setSuccessful(true);
			},
			(error) => {
			  console.log("Error "); 	
			  const resMessage =
				(error.response &&
				  error.response.data &&
				  error.response.data.message) ||
				error.message ||
				error.toString();

			  setMessage(resMessage);
			  setSuccessful(false);
			}
		  );
		  console.log("No problem");
    } else {
		setMessage("Η τιμή του κωδικού πρόσβασης είναι διαφορετική από την τιμή επαλήθευσης!");
	    setSuccessful(false);
	}	
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleChangePassword} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Όνομα χρήστη</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Νέος Κωδικός πρόσβασης</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
			  
			  <div className="form-group">
                <label htmlFor="verifyPassword">Επαλήθευση νέου Κωδικού πρόσβασης</label>
                <Input
                  type="password"
                  className="form-control"
                  name="verifyPassword"
                  value={verifyPassword}
                  onChange={onChangeVerifyPassword}
                  validations={[required, vverifypassword]}
                />
              </div>
			  &nbsp;
			  &nbsp;
              <div className="form-group">
                <button className="btn btn-primary btn-block">Αλλαγή κωδικού πρόσβασης</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;