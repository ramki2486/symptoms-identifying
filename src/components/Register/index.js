import React, { useState } from 'react'
import {
  StyledForm,
  StyledButton,
  StyledAlert
} from '../../styled-components'
import Input from '../InputBox'
import { validateName, validateEmail, validatePassword } from '../../validations'
import styles from '../Home/index.module.scss';

const initialState = {
  name: '',
  nameError: false,
  nameErrorMessage: '',
  email: '',
  emailError: false,
  emailErrorMessage: '',
  password: '',
  passwordError: false,
  passwordErrorMessage: '',
}

const Register = () => {
  const [state, setState] = useState(initialState)
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);

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
    } else if (name === 'name') {
      const checkError = validateName(value)
      setState({
        ...state,
        name: value,
        nameError: checkError.error,
        nameErrorMessage: checkError.error ? checkError.errorMessage : '',
      })
    } else if(name === 'password') {
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
    const { name, nameError, email, emailError, password, passwordError } = state;
    if(!(nameError && emailError && passwordError)){
      setLoading(true);
      setStatus({});
      if(localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user.filter(ele => ele.email === email).length === 0){
          localStorage.setItem('user', JSON.stringify([...user, { name, email, password }]));
          setTimeout(() => {
            setLoading(false);
            setStatus({ msg: 'Thanks for registering! You can login now!', error: ''});
          }, 600);
        }else {
          setTimeout(() => {
            setStatus({ msg: '', error: 'Email already exists!' });
            setLoading(false);
          }, 600);
        }
      } else {
        localStorage.setItem('user', JSON.stringify([{ name, email, password}]));
        setTimeout(() => {
          setStatus({ msg: 'Thanks for registering! You can login now!', error: ''});
          setLoading(false);
        }, 600);
      }
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        type="text"
        value={state.name}
        placeholder="Enter your name"
        change={handleChange}
        error={state.nameError}
        errorMessage={state.nameErrorMessage}
      />
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
      {loading ? 
        <div className={styles.loader} style={{ marginTop: '25px', width: '35px', height: '35px'}}></div> : 
        <StyledButton>Register</StyledButton>}
      {(status.msg || status.error) && 
      <StyledAlert error={status.error}>{status.error ? status.error : status.msg}</StyledAlert>}
    </StyledForm>
  )
}

export default Register
