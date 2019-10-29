import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

class Header extends React.Component {
  render() {
    const { diseases, Submit, loading, handleDelete } = this.props;

    return (
      <>
        <div className={styles.Header}>
          <h4>Symtoms Identifying App</h4>
          {diseases.length > 0 && (
            <div className={styles.symptoms}>
              <h4>Your Symptoms:</h4>
              {diseases.map((ele, index) => (
                <h5 onClick={handleDelete(ele)} role="presentation" key={String(index)}>
                  {ele}
                </h5>
              ))}
            </div>
          )}
          <button type="button" onClick={Submit}>
            Submit
          </button>
        </div>
        {loading && (
          <div className={`${styles.loading} ${styles['style-2']}`}>
            <div className={`${styles['loading-wheel']}`}></div>
          </div>
        )}
      </>
    );
  }
}

Header.defaultProps = {
  diseases: [],
  loading: false,
};

Header.propTypes = {
  diseases: PropTypes.array,
  Submit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
};

export default Header;
