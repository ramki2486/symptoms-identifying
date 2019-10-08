import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.scss';
import symptoms from '../../data/symptoms';

class Main extends React.Component {
  state = {
    diseases: [],
  };

  handleSave = disease => () => {
    this.setState(prevState => ({
      diseases: [...prevState.diseases, disease],
    }));
  };

  render() {
    const halfSymptoms = [...symptoms];
    halfSymptoms.splice(0, Math.ceil(symptoms.length / 2));
    const nextHalfSymptoms = [...symptoms];
    nextHalfSymptoms.splice(Math.ceil(symptoms.length / 2));

    const { diseases } = this.state;
    console.log(diseases);
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
          <Footer />
        </div>
        <div className={styles.right}>
          {nextHalfSymptoms.map(ele => (
            <h5 onClick={this.handleSave(ele)} role="presentation">
              {ele}
            </h5>
          ))}
        </div>
      </>
    );
  }
}

export default Main;
