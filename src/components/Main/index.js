import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.scss';

function Main() {
  return (
    <div className={styles.Main}>
      <Header />
      <Footer />
    </div>
  );
}

export default Main;
