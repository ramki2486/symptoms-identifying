import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { StyledHome } from '../../styled-components';
import Login from '../Login';
import Register from '../Register';
import styles from './index.module.scss';

const Home = ({ history }) => {
  const [activeLink, setActiveLink] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const onActiveClick = () => setActiveLink(active => !active);

  useEffect(() => {
    if (localStorage.getItem('logout') === 'false' && localStorage.getItem('user')) {
      history.push('/user/dashboard');
    }
  }, []);

  const handlelogin = (ele, name) => {
    setIsLoggedIn(ele);
    setName(name);
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleClick = ele => () => {
    if (ele === 'yes') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsLoggedIn(false);
        history.push('/user/dashboard');
      }, 200);
    } else if (ele === 'no') {
      setMessage('Thank you. Have a nice day!');
      setTimeout(() => setLoading(true), 1000);
      setTimeout(() => {
        localStorage.setItem('logout', 'true');
        setLoading(false);
        setIsLoggedIn(false);
        setMessage('');
      }, 2000);
    }
  };

  return (
    <StyledHome>
      {isLoggedIn && (
        <>
          {loading && <div className={styles.loader}></div>}
          {!loading && (
            <div className={styles.interact}>
              <h4 className={styles.name}>{`Hi ${name}`}</h4>
              <h4 style={{ textAlign: 'right' }}>How can i help you ?</h4>
              <h4 className={styles.med}>Do you need any medication?</h4>
              <div className={styles.ask}>
                <h4 onClick={handleClick('yes')} role="presentation">
                  Yes
                </h4>
                <h4 onClick={handleClick('no')} role="presentation">
                  No
                </h4>
              </div>
              {message && <h4 className={styles.med}>{message}</h4>}
            </div>
          )}
        </>
      )}
      {!isLoggedIn && (
        <>
          <div className="links">
            <Link to="/" onClick={activeLink ? onActiveClick : () => {}} className={!activeLink ? 'active' : ''}>
              Login
            </Link>
            <Link to="/" onClick={!activeLink ? onActiveClick : () => {}} className={activeLink ? 'active' : ''}>
              Register
            </Link>
          </div>
          {!activeLink ? <Login handlelogin={handlelogin} /> : <Register />}
        </>
      )}
    </StyledHome>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Home);
