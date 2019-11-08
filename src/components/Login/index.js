import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { StyledForm, StyledButton, StyledAlert } from '../../styled-components'
import Input from '../InputBox'
import { validateEmail, validatePassword } from '../../validations'

const initialState = {
  email: '',
  emailError: false,
  emailErrorMessage: '',
  password: '',
  passwordError: false,
  passwordErrorMessage: '',
}

const Login = props => {
  const [state, setState] = useState(initialState)
  const [status, setStatus] = useState({});

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'email') {
      const checkError = validateEmail(value)
      setState({
        ...state,
        email: value,
        emailError: checkError.error,
        emailErrorMessage: checkError.error ? checkError.errorMessage : '',
      })
    }else if(name === 'password') {
      const checkError = validatePassword(value);
      setState({
        ...state,
        password: value,
        passwordError: checkError.error,
        passwordErrorMessage: checkError.error ? checkError.errorMessage : '',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { email, emailError, password, passwordError } = state;
    const { handlelogin } = props;
    if(!(passwordError && emailError)){
      if(localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user')).filter(ele => ele.email === email);
        if(user) {
          if(user[0].password === password) {
            if(localStorage.getItem('logout')) {
              localStorage.setItem('logout', 'false');
            }
            setStatus({ msg: 'Your Redirecting to Dashboard..', error: ''});
            // history.push('/user/dashboard');
            handlelogin(true);
          } else {
            setStatus({ msg: '', error: 'Password is wrong!'});
          }
        } else {
          // user not found
          setStatus({ msg: '', error: 'Email not registered!'});
        }
      } else {
        // user not found
        setStatus({ msg: '', error: 'Email not registered!'});
      }
    }
  }

  

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        type="text"
        value={state.email}
        placeholder="Enter your email"
        change={handleChange}
        error={state.emailError}
        errorMessage={state.emailErrorMessage}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={state.password}
        error={state.passwordError}
        change={handleChange}
        errorMessage={state.passwordErrorMessage}
      />
      <StyledButton>Login</StyledButton>
      {(status.msg || status.error) && 
      <StyledAlert error={status.error}>{status.error ? status.error : status.msg}</StyledAlert>}
    </StyledForm>
  )
}

Login.propTypes = {
  handlelogin: PropTypes.func.isRequired
}

export default withRouter(Login);
