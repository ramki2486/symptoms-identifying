import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

class Header extends React.Component {

  state = {
    loading: false
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { diseases } = this.props;
    if(diseases && diseases.length > 0) {
      this.setState({ loading: true });
      try {
        const res = await axios.post('http://localhost:2018/symptoms-identify', { symptoms: JSON.stringify(diseases) });
        if(res) this.setState({ loading: false })
      } catch (error) {
        console.log(error);
        this.setState({ loading: false })
      }
    }
  }

  render() {
    const { diseases } = this.props;
    const { loading } = this.state;

    return (
      <>
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
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </div>
        {loading && (
          <div className={`${styles.loading} ${styles['style-2']}`}>
            <div className={`${styles['loading-wheel']}`}></div>
          </div>
        )}
      </>
    )
  }
}

Header.defaultProps = {
  diseases: []
}

Header.propTypes = {
  diseases: PropTypes.array
}

export default Header;
