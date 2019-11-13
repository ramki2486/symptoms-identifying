/* eslint-disable */
import React from 'react';
import axios from 'axios';
import Header from '../Header';
import styles from './index.module.scss';
import symptoms from '../../data/symptoms';

class Main extends React.Component {
  state = {
    diseases: [],
    query: '',
    isSubmit: false,
    resStat: null,
  };

  componentWillUnmount() {
    clearInterval(this.intervel);
  }

  handleSave = disease => () => {
    const { isSubmit } = this.state;
    if (isSubmit) {
      return this.setState({ diseases: [disease], isSubmit: false, response: false, resStat: null });
    }
    this.setState(prevState => ({
      diseases: [...prevState.diseases, disease],
      searchResults: [],
      response: false,
      resStat: null,
    }));
  };

  handleDelete = ele => () => {
    const { diseases } = this.state;
    this.setState({
      diseases: diseases.filter(el => el !== ele),
      resStat: null,
      response: false,
    });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      query: value,
    });
    if (symptoms && symptoms.length) {
      const applyFilter = [];
      symptoms.map(ele => {
        const regex = new RegExp(value, 'gi');
        if (ele.match(regex) || ele.match(regex)) {
          return applyFilter.push(ele);
        }
        return false;
      });
      this.setState({
        searchResults: applyFilter,
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { diseases } = this.state;
    if (diseases.length > 0) {
      this.setState({ loading: true, resStat: null });
      axios
        .post('http://localhost:2018/symptoms-identify', { symptoms: JSON.stringify(diseases) })
        .then(res => {
          console.log(res);
          this.setState({
            response: { ...res.data },
            isSubmit: true,
            loading: false,
          });
        })
        .catch(err => this.setState({ errMessage: JSON.stringify(err), loading: false }));
    }
  };

  hanldeClick = param => () => {
    this.setState(
      {
        resStat: param,
      },
      () => {
        if (param === 'yes') {
          this.setState({ overlay: true });
          setTimeout(() => this.setState({ overlay: false }), 2000);
        }
      }
    );
  };

  // shuffle = (array, type) => {
  //   array.sort(() => Math.random() - 0.5);
  //   return this.setState({
  //     [type]: array,
  //   });
  // };

  render() {
    const { diseases, query, searchResults, response, loading, errMessage, resStat, overlay } = this.state;

    const halfSymptoms = [...symptoms];
    const nextHalfSymptoms = [...symptoms];
    halfSymptoms.splice(0, Math.ceil(symptoms.length / 2));
    nextHalfSymptoms.splice(Math.ceil(symptoms.length / 2));

    return (
      <>
        <div className={styles.left}>
          {halfSymptoms.map((ele, index) => (
            <h5 onClick={this.handleSave(ele)} role="presentation" key={String(index)}>
              {ele}
            </h5>
          ))}
        </div>
        <div className={styles.Main}>
          <Header diseases={diseases} Submit={this.handleSubmit} loading={loading} handleDelete={this.handleDelete} />
          {errMessage && <p>{errMessage}</p>}
          {!response && (
            <div className={styles.result}>
              <p>
                <span>Disease: </span>
                Lorem ipsum dolor sit amet, consectetur.
              </p>
              <p>
                <span>Remedie:</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </p>
            </div>
          )}
          {response && (
            <div className={styles.result}>
              <p>
                <span>Disease: </span>
                {response.disease}
              </p>
              <p>
                <span>Remedie:</span> {response.remedy}
              </p>
              {resStat === 'yes' ? (
                <>
                  {overlay && (
                    <div className={styles.overlay}>
                      <div className={styles.overlayText}>Thank You</div>
                    </div>
                  )}
                </>
              ) : resStat === 'no' ? (
                <h4 className={styles.bad}>"Okay. Will improve our results.Thank you"</h4>
              ) : (
                <div className={styles.resStat}>
                  <h4>are you satisfied with the result?</h4>
                  <h4>
                    <span onClick={this.hanldeClick('yes')}>Yes</span> <span onClick={this.hanldeClick('no')}>No</span>
                  </h4>
                </div>
              )}
            </div>
          )}
          <div className={styles.Footer}>
            <form className={styles.searchForm}>
              <input
                type="text"
                id="search"
                onChange={this.handleChange}
                value={query}
                placeholder="Search for symptoms"
              />
            </form>
            {searchResults && searchResults.length > 0 && (
              <div className={styles.searchArea}>
                {searchResults.map((ele, index) => (
                  <>
                    <div key={String(index)} onClick={this.handleSave(ele)} role="presentation">
                      {ele}
                    </div>
                    <hr />
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.right}>
          {nextHalfSymptoms.map((ele, index) => (
            <h5 onClick={this.handleSave(ele)} role="presentation" key={String(index)}>
              {ele}
            </h5>
          ))}
        </div>
      </>
    );
  }
}

export default Main;
