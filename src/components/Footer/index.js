import React from 'react';
import styles from './index.module.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className={styles.Footer}>
        <form className={styles.searchForm}>
          <input type="text" id="search" placeholder="search for symptoms" />
        </form>
      </div>
    );
  }
}

export default Footer;
