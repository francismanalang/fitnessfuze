import React from 'react';

export default class AddExercisePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseName: '',
      exercises: [],
      data: {
        exercises: []
      }
    };
    this.handleExerciseNameChange = this.handleExerciseNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleCompletedStatusChange = this.handleCompletedStatusChange.bind(this);
  }

  handleExerciseNameChange(event) {
    this.setState({ exerciseName: event.target.value });
  }

  handleRepsChange(index, event) {
    const dataCopy = Object.assign({}, this.state.data);
    dataCopy.exercises = dataCopy.exercises.slice();
    dataCopy.exercises[index] = Object.assign({}, dataCopy.exercises[index], { reps: event.target.value });
    this.setState({ data: dataCopy });
  }

  handleWeightChange(index, event) {
    const dataCopy = Object.assign({}, this.state.data);
    dataCopy.exercises = dataCopy.exercises.slice();
    dataCopy.exercises[index] = Object.assign({}, dataCopy.exercises[index], { weight: event.target.value });
    this.setState({ data: dataCopy });
  }

  handleCompletedStatusChange(index, event) {
    const dataCopy = Object.assign({}, this.state.data);
    dataCopy.exercises = dataCopy.exercises.slice();
    dataCopy.exercises[index] = Object.assign({}, dataCopy.exercises[index], { isCompleted: !dataCopy.exercises[index].isCompleted });
    this.setState({ data: dataCopy });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    if (this.state.exerciseName === '') {
      return;
    }
    const updatedExerciseCopy = this.state.exercises.concat(this.state.exerciseName);
    const updatedDataCopy = this.state.data.exercises.concat({
      name: this.state.exerciseName,
      weight: 0,
      reps: 0,
      setNumber: 1,
      isCompleted: false
    });
    this.setState({
      exerciseName: '',
      exercises: updatedExerciseCopy,
      data: {
        exercises: updatedDataCopy
      }
    });
  }

  render() {
    const { exercises, data } = this.state;
    const allExercises = exercises.map((exercise, index) => {
      const iconChange = data.exercises[index].isCompleted
        ? 'solid'
        : 'regular';
      return (
        <div key={index} className='exercise-padding'>
          <div className='box-padding'>
            <div className='exercise-container'>
              <p className='exercise-name'>{exercise}</p>
            </div>
            <form>
              <div className='sets-container'>
                <div className='row'>
                  <div className='col-full'>
                    <div className='header-container'>
                      <span>Sets</span>
                      <span>Reps</span>
                      <span>lbs</span>
                      <span>Completed</span>
                    </div>
                    <div className='input-container'>
                      <span>{this.state.data.exercises[index].setNumber}</span>
                      <span>
                        <div className='number-input-container'>
                          <input onChange={event => this.handleRepsChange(index, event)} className='number-input' type="number" name="reps" id="reps" value={this.state.data.exercises[index].reps} />
                        </div>
                      </span>
                      <span>
                        <div className='number-input-container'>
                          <input onChange={event => this.handleWeightChange(index, event)} className='number-input' type="number" name="weight" id="weight" value={this.state.data.exercises[index].weight} />
                        </div>
                      </span>
                      <span><i className={`fa-${iconChange} fa-circle-check fa-lg`} onClick={event => this.handleCompletedStatusChange(index, event)}></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
