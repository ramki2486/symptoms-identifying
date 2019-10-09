import React from 'react';
import Header from '../Header';
import styles from './index.module.scss';
import symptoms from '../../data/symptoms';

class Main extends React.Component {
  state = {
    diseases: [],
    query: '',
  };

  handleSave = disease => () => {
    this.setState(prevState => ({
      diseases: [...prevState.diseases, disease],
    }));
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

  render() {
    const halfSymptoms = [...symptoms];
    halfSymptoms.splice(0, Math.ceil(symptoms.length / 2));
    const nextHalfSymptoms = [...symptoms];
    nextHalfSymptoms.splice(Math.ceil(symptoms.length / 2));

    const { diseases, query, searchResults } = this.state;

    return (
      <>
        <div className={styles.left}>
          {halfSymptoms.map(ele => (
            <h5 onClick={this.handleSave(ele)} role="presentation">
              {ele}
            </h5>
          ))}
        </div>
        <div className={styles.Main}>
          <Header diseases={diseases} />
          {/* <div className={styles.result}>
            <p>
              Precaution: <span>Hello</span>
            </p>
            <p>
              Remedie:{' '}
              <span>
                Something Something Something Something Something Something
                Something Something Something Something Something Something
                Something Something Something Something Something Something
                Something Something Something Something Something Something
              </span>
            </p>
          </div> */}
          <div className={styles.Footer}>
            <form className={styles.searchForm}>
              <input
                type="text"
                id="search"
                onChange={this.handleChange}
                value={query}
                placeholder="search for symptoms"
              />
            </form>
          </div>
        </div>
        <div className={styles.right}>
          {nextHalfSymptoms.map(ele => (
            <h5 onClick={this.handleSave(ele)} role="presentation">
              {ele}
            </h5>
          ))}
        </div>
        {searchResults && searchResults.length > 0 && (
          <div className={styles.searchArea}>
            {searchResults.map((ele, index) => (
              <>
                <div
                  key={String(index)}
                  onClick={this.handleSave(ele)}
                  role="presentation"
                >
                  {ele}
                </div>
                <hr />
              </>
            ))}
          </div>
        )}
      </>
    );
  }
}

export default Main;
