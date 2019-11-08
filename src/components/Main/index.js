/* eslint-disable no-undef */
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
  };

  componentWillUnmount() {
    clearInterval(this.intervel);
  }

  handleSave = disease => () => {
    const { isSubmit } = this.state;
    if (isSubmit) {
      this.setState({ diseases: [], isSubmit: false, response: {} });
    }
    this.setState(prevState => ({
      diseases: [...prevState.diseases, disease],
      searchResults: [],
    }));
  };

  handleDelete = ele => () => {
    const { diseases } = this.state;
    this.setState({
      diseases: diseases.filter(el => el !== ele),
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
      this.setState({ loading: true });
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

  // shuffle = (array, type) => {
  //   array.sort(() => Math.random() - 0.5);
  //   return this.setState({
  //     [type]: array,
  //   });
  // };

  render() {
    const {
      diseases,
      query,
      searchResults,
      response,
      loading,
      errMessage,
    } = this.state;

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
