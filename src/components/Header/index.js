import React from 'react';
import styles from './index.module.scss';

class Header extends React.Component {
  render() {
    return (
      <div className={styles.Header}>
        <h4>Rama</h4>
      </div>
    )
  }
}

export default Header;