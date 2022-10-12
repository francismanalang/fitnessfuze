import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: 1,
      reps: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepetitionChange = this.handleRepetitionChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  handleRepetitionChange(event) {
    this.setState({ reps: event.target.value });
  }

  render() {
    const { user } = this.context;
    if (!user) return <Redirect to="" />;

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
      </>
    );
  }
}

Calculator.contextType = AppContext;
