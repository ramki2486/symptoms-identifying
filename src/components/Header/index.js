import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

class Header extends React.Component {
  render() {
    const { diseases } = this.props;

    return (
      <div className={styles.Header}>
        <h4>Symtoms Identifying App</h4>
        {diseases.length > 0 && (
          <div className={styles.symptoms}>
            <h4>Your Symptoms:</h4>
            {diseases.map(ele => (
              <h5>{ele}</h5>
            ))}
          </div>
        )}
        <button type="button">Submit</button>
      </div>
    );
  }
}

Header.propTypes = {
  diseases: PropTypes.array.isRequired,
};

export default Header;
