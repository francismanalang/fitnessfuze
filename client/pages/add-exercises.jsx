import React from 'react';

export default class AddExercisePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseName: '',
      exercises: []
    };
    this.handleExerciseNameChange = this.handleExerciseNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleExerciseNameChange(event) {
    this.setState({ exerciseName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    const updatedExerciseCopy = this.state.exercises.concat(this.state.exerciseName);
    this.setState({ exerciseName: '', exercises: updatedExerciseCopy });
  }

  render() {
    const { exercises } = this.state;
    const allExercises = exercises.map((exercise, index) => {
      return (
        <div key={index} className='box-padding'>
          <div className='exercise-container'>
            <p className='exercise-name'>{exercise}</p>
          </div>
        </div>
      );
    });
    return (
      <>
        <h1 className='start-text'>Workout #{this.props.workoutId}</h1>
        <div className='start-button-container'>
          <button type="button" className="btn btn-primary start-button" data-bs-toggle="modal" data-bs-target="#exerciseNameModal">Add an exercise</button>
        </div>
        <div className='exercise-padding'>
          {allExercises}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="modal modal-sm fade" id="exerciseNameModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Enter Exercise Name:</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className='start-button-container'>
                    <input required type="text" name='exerciseName' onChange={this.handleExerciseNameChange} value={this.state.exerciseName} className='exercise-name-input' />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary close-button" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.handleClick}>Enter</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}
