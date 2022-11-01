import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.startWorkoutClick = this.startWorkoutClick.bind(this);
  }

  startWorkoutClick() {
    const token = window.localStorage.getItem('fitnessfuze-jwt');
    fetch('/workouts/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${token}`
      }
    })
      .then(res => res.json())
      .then(workoutData => {
        window.location.hash = `#workouts?workoutId=${workoutData.workoutId}`;
      })
      .catch(err => console.error(err));
  }

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <>
      <div className='start-page-container'>
        <div className='start-container'>
          <h1 className='start-text'>Start Workout:</h1>
          <button type="button" className="btn btn-primary exercises-button" onClick={this.startWorkoutClick}>Begin a new workout</button>
        </div>
      </div>
      </>
    );
  }
}

StartPage.contextType = AppContext;
