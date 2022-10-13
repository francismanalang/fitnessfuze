import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
// import BarChart from '../components/barchart';

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: 1,
      reps: 1,
      oneRepMax: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepetitionChange = this.handleRepetitionChange.bind(this);
    this.oneRepMaxCalculator = this.oneRepMaxCalculator.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { weight, reps } = this.state;
    this.oneRepMaxCalculator(weight, reps);
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  handleRepetitionChange(event) {
    this.setState({ reps: event.target.value });
  }

  oneRepMaxCalculator(weight, reps) {
    if (reps <= 10) {
      const oneRepMax = weight * (36 / (37 - reps));
      this.setState({ oneRepMax });
    } else {
      const oneRepMax = weight * (1 + 0.0333 * reps);
      this.setState({ oneRepMax });
    }
  }

  render() {
    const { user } = this.context;
    const { oneRepMax } = this.state;
    if (!user) return <Redirect to="" />;
    // const chartData = {
    //   labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    //   datasets: [{
    //     label: 'Users Gained',
    //     data: [202, 202, 387, 876, 254, 463, 253, 574]
    //   }]
    // };

    const oneRepMaxText = oneRepMax === null || oneRepMax === 0
      ? 'hidden'
      : '';

    return (
      <>
        <div className='text-align-center font-family'>
          <h1 className='calculator-heading'>One Rep Max Calculator</h1>
          <p className='calulator-text'>Calculate your one-rep max (1RM) for any lift. Your one-rep max is the max weight you can lift for a single repitition for a given exercise.</p>
        </div>
        <form className='calculator-form text-align-center' onSubmit={ this.handleSubmit }>
          <div className='form-padding'>
            <label className='calculator-label label-weight' htmlFor="weight">Weight</label>
            <input required className='calculator-input' type="number" name='weight' id='weight' min={1} onChange={this.handleWeightChange} value={this.state.weight}/>
          </div>
          <div className='form-padding'>
            <label className='calculator-label' htmlFor="repetition">Repetition</label>
            <input required className='calculator-input' type="number" name='repetition' id='repetition' min={1} onChange={this.handleRepetitionChange} value={this.state.reps}/>
          </div>
          <div className='calculator-button-wrapper'>
            <button type='submit' className='calculator-button font-family'>Calculate One Rep Max</button>
          </div>
        </form>
        <h2 className={`text-align-center ${oneRepMaxText}`}>Your One Rep Max is: {Number(oneRepMax).toFixed(0)}</h2>
        {/* <BarChart chartData={chartData}/> */}
      </>
    );
  }
}

Calculator.contextType = AppContext;
