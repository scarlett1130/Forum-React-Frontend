import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
// import "./Auth.css";
import Navigation from '../Navigation'
import { useSelector, useDispatch } from "react-redux";
import { ResetPassword } from '../../store/modules/auth/actions/authAction';
import { Redirect, Link } from 'react-router-dom';

import Message from '../utils/Message';



const PasswordReset = (props) => {

  console.log("this is the token: ", props.match.params.token)

  const currentState = useSelector((state) => state.Auth);

  const [resetDetails, setResetDetails] = useState({
    token: props.match.params.token,
    new_password: '',
    retype_password: ''
  });

  const dispatch = useDispatch()

  const resetPass = (details) => dispatch(ResetPassword(details, clearInput))


  const clearInput = () => {
    setResetDetails({
      token: '',
      new_password: '',
      retype_password: ''
    })
  } 

  const handleChange = e => {
    setResetDetails({
      ...resetDetails,
      [e.target.name]: e.target.value
    })
  }

  const submitRequest = (e) => {
    e.preventDefault()
    resetPass({
      token: resetDetails.token,
      new_password: resetDetails.new_password,
      retype_password: resetDetails.retype_password
    });
  }

  if(currentState.isAuthenticated){
    return <Redirect to='/' />
  }

  return (
    <div className="App">
      <div>
        <Navigation />
      </div>
      <div className="container Auth">
        <Card className="card-style">
          <CardHeader>Reset Password</CardHeader>
          <CardBody>
            <FormGroup>
              { currentState.successMessage != null && currentState.resetError == null ? (
                <span>
                <Message msg={currentState.successMessage} />
                </span>
                ) : (
                  ""
              )}
            </FormGroup>
            <FormGroup>
            { currentState.resetError && currentState.resetError.Invalid_token ? (
              <span>
                <small className="color-red">{currentState.resetError.Invalid_token}</small>
                <small className="ml-2"><Link to="/forgotpassword">here </Link></small>
              </span>
              ) : (
                ""
            )}
            { currentState.resetError && currentState.resetError.Empty_passwords ? (
              <small className="color-red">{currentState.resetError.Empty_passwords}</small>
              ) : (
                ""
            )}
            { currentState.resetError && currentState.resetError.Invalid_Passwords ? (
              <small className="color-red">{ currentState.resetError.Invalid_Passwords }</small>
              ) : (
                ""
            )}
            { currentState.resetError && currentState.resetError.Password_unequal ? (
              <small className="color-red">{ currentState.resetError.Password_unequal }</small>
              ) : (
                ""
            )}
            </FormGroup>

            <form onSubmit={submitRequest}>
            <FormGroup>
              <Label>New Password</Label>
              <Input type="password" name="new_password" value={resetDetails.new_password} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
              <Label>Retype Password</Label>
              <Input type="password" name="retype_password" value={resetDetails.retype_password}  onChange={handleChange} />
              </FormGroup>
              { currentState.isLoading ? (
                <Button
                  color="primary"
                  type="submit"
                  block
                  disabled
                >
                  Reseting...
                </Button>
              ) : (
                <Button
                  color="primary"
                  type="submit"
                  block
                  disabled={ resetDetails.new_password === "" || resetDetails.retype_password === ""  }
                >
                  Save Password
              </Button>
              )}
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
  );
}

export default PasswordReset
