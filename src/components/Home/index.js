/* eslint-disable */
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
  const [message, setMessage] = useState([]);
  const [query, setQuery] = useState('');

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
      }, 1000);
    } else if (ele === 'no') {
      setTimeout(() => setLoading(true), 1000);
      setTimeout(() => {
        localStorage.setItem('logout', 'true');
        setLoading(false);
        setIsLoggedIn(false);
        setMessage('');
      }, 2000);
    }
  };

  const handleChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage([...message, query]);
    setQuery('');
  };

  var patt = new RegExp(/(i|need|medication|yes)/gi);

  const WrongMessage = message.length > 0 && patt.test(message[message.length - 1]);

  return (
    <StyledHome>
      {isLoggedIn && (
        <>
          {loading && <div className={styles.loader}></div>}
          {!loading && (
            <div className={styles.interact}>
              <h4 className={styles.name}>{`Hi ${name}`}</h4>
              <h4 style={{ textAlign: 'right' }}>How can i help you ?</h4>
              {message.length > 0 &&
                message.map(ele => (
                  <>
                    <h4 className={styles.med}>{ele}</h4>
                    {message.length > 0 && !WrongMessage ? (
                      <h4 className={styles.med}>Sorry. I couldn't get You.</h4>
                    ) : (
                      <h4 className={styles.med}>Oh! Do you need medication?</h4>
                    )}
                  </>
                ))}
              {message.length > 0 && message[message.length - 1] === 'yes' ? (
                <>
                  <h4 className={styles.med}>Okay.</h4>
                  {handleClick('yes')()}
                </>
              ) : (
                message[message.length - 1] === 'no' && (
                  <>
                    <h4 className={styles.med}>Oh! Oops. Thank you. Have a nice day!</h4>
                    {handleClick('no')()}
                  </>
                )
              )}
            </div>
          )}
          <form className={styles.searchForm} onSubmit={handleSubmit}>
            <input type="text" id="search" onChange={handleChange} value={query} placeholder="How can i help you?" />
          </form>
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
          <p className={styles.discla}>
            Disclamier: We are 100% sure about the accurate result, but we provide our best accurate!
          </p>
        </>
      )}
    </StyledHome>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Home);
