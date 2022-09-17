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
    this.handleAddSet = this.handleAddSet.bind(this);
  }

  handleExerciseNameChange(event) {
    this.setState({ exerciseName: event.target.value });
  }

  handleRepsChange(exerciseIndex, setIndex, event) {
    const dataCopy = Object.assign({}, this.state.data);
    dataCopy.exercises = dataCopy.exercises.slice();
    dataCopy.exercises[exerciseIndex].sets = dataCopy.exercises[exerciseIndex].sets.slice();
    dataCopy.exercises[exerciseIndex].sets[setIndex] = Object.assign({}, dataCopy.exercises[exerciseIndex].sets[setIndex], { reps: event.target.value });
    this.setState({ data: dataCopy });
  }

  handleWeightChange(exerciseIndex, setIndex, event) {
    const dataCopy = Object.assign({}, this.state.data);
    dataCopy.exercises = dataCopy.exercises.slice();
    dataCopy.exercises[exerciseIndex].sets = dataCopy.exercises[exerciseIndex].sets.slice();
    dataCopy.exercises[exerciseIndex].sets[setIndex] = Object.assign({}, dataCopy.exercises[exerciseIndex].sets[setIndex], { weight: event.target.value });
    this.setState({ data: dataCopy });
  }

  handleCompletedStatusChange(exerciseIndex, setIndex, event) {
    const dataCopy = Object.assign({}, this.state.data);
    dataCopy.exercises = dataCopy.exercises.slice();
    dataCopy.exercises[exerciseIndex].sets = dataCopy.exercises[exerciseIndex].sets.slice();
    dataCopy.exercises[exerciseIndex].sets[setIndex] = Object.assign({}, dataCopy.exercises[exerciseIndex].sets[setIndex], { isCompleted: !dataCopy.exercises[exerciseIndex].sets[setIndex].isCompleted });
    this.setState({ data: dataCopy });
  }

  handleAddSet(exerciseIndex, event) {
    const setArray =
      {
        isCompleted: false,
        weight: 0,
        reps: 0
      };
    const updatedDataCopy = this.state.exercises[exerciseIndex].sets.concat(setArray);
    this.setState(
      {
        data: {
          exercises: [
            {
              sets: updatedDataCopy
            }
          ]
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    if (this.state.exerciseName === '') {
      return;
    }
    const updatedExerciseCopy = this.state.exercises.concat(this.state.exerciseName);
    const updatedDataCopy = this.state.data.exercises.concat(
      {
        name: this.state.exerciseName,
        sets: [
          {
            isCompleted: false,
            weight: 0,
            reps: 0
          }
        ]
      }
    );
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
    const allExercises = exercises.map((exercise, exerciseIndex) => {
      const allSets = data.exercises[exerciseIndex].sets.map((set, setIndex) => {
        const iconChange = data.exercises[exerciseIndex].sets[setIndex].isCompleted
          ? 'solid'
          : 'regular';
        return (
          <div key={setIndex} className='input-container sets-padding'>
            <span>{setIndex + 1}</span>
            <span>
              <div className='reps-padding'>
                <input onChange={event => this.handleRepsChange(exerciseIndex, setIndex, event)} className='number-input' type="number" name="reps" id="reps" value={this.state.data.exercises[exerciseIndex].sets[setIndex].reps} />
              </div>
            </span>
            <span>
              <div className='weight-padding'>
                <input onChange={event => this.handleWeightChange(exerciseIndex, setIndex, event)} className='number-input' type="number" name="weight" id="weight" value={this.state.data.exercises[exerciseIndex].sets[setIndex].weight} />
              </div>
            </span>
            <span className='icon-padding'><i className={`fa-${iconChange} fa-circle-check fa-lg`} onClick={event => this.handleCompletedStatusChange(exerciseIndex, setIndex, event)}></i></span>
          </div>
        );
      });
      return (
        <div key={exerciseIndex} className='exercise-padding'>
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
                      <span>Weight</span>
                      <span>Completed</span>
                    </div>
                    {allSets}
                    <div className='add-set-container'>
                      <button type='button' className='add-set-button' onClick={event => this.handleAddSet(exerciseIndex, event)}>Add set</button>
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
