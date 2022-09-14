import React from 'react';

export default class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.starkWorkoutClick = this.starkWorkoutClick.bind(this);
  }

  starkWorkoutClick() {
    fetch('/workouts/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(workoutData => {
        window.location.hash = `#workouts?workoutid=${workoutData.workoutId}`;
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <h1 className='start-text'>Start Workout</h1>
        <div className='start-button-container'>
          <button type="button" className="btn btn-primary start-button" onClick={this.starkWorkoutClick}>Begin a new workout</button>
        </div>
      </>
    );
  }
}
