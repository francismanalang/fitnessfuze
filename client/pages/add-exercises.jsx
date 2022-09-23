import React from 'react';
import AppContext from '../lib/app-context';

export default class AddExercisePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutId: this.props.workoutId,
      saveModalOpen: false,
      exerciseName: '',
      exercises: []
    };
    this.handleCompletedStatusChange = this.handleCompletedStatusChange.bind(this);
    this.handleExerciseNameChange = this.handleExerciseNameChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleSaveWorkout = this.handleSaveWorkout.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleSaveModal = this.handleSaveModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSaveWorkout() {
    const token = window.localStorage.getItem('react-context-jwt');
    const { workoutId, exercises } = this.state;
    const filteredExercises = exercises.map(exercise => { return { ...exercise, sets: exercise.sets.filter(set => set.isCompleted === true && set !== undefined) }; });
    fetch(`/workouts/start/${workoutId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${token}`
      },
      body: JSON.stringify({ exercises: filteredExercises })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ exercises: [] });
        window.location.hash = 'workout';
      })
      .catch(err => console.error('Fetch failed during PUT', err));
  }

  handleExerciseNameChange(event) {
    this.setState({ exerciseName: event.target.value });
  }

  handleRepsChange(exerciseIndex, setIndex, event) {
    const exercisesCopy = Object.assign([], this.state.exercises);
    exercisesCopy[exerciseIndex].sets = exercisesCopy[exerciseIndex].sets.slice();
    exercisesCopy[exerciseIndex].sets[setIndex] = Object.assign({}, exercisesCopy[exerciseIndex].sets[setIndex], { reps: event.target.value });
    this.setState({ exercises: exercisesCopy });
  }

  handleWeightChange(exerciseIndex, setIndex, event) {
    const exercisesCopy = Object.assign([], this.state.exercises);
    exercisesCopy[exerciseIndex].sets = exercisesCopy[exerciseIndex].sets.slice();
    exercisesCopy[exerciseIndex].sets[setIndex] = Object.assign({}, exercisesCopy[exerciseIndex].sets[setIndex], { weight: event.target.value });
    this.setState({ exercises: exercisesCopy });
  }

  handleCompletedStatusChange(exerciseIndex, setIndex, event) {
    const exercisesCopy = Object.assign([], this.state.exercises);
    exercisesCopy[exerciseIndex].sets = exercisesCopy[exerciseIndex].sets.slice();
    exercisesCopy[exerciseIndex].sets[setIndex] = Object.assign({}, exercisesCopy[exerciseIndex].sets[setIndex], { isCompleted: !exercisesCopy[exerciseIndex].sets[setIndex].isCompleted });
    this.setState({ exercises: exercisesCopy });
  }

  handleSaveModal() {
    this.setState({ saveModalOpen: !this.state.saveModalOpen });
  }

  handleAddSet(exerciseIndex, event) {
    const setArray = {
      isCompleted: false,
      weight: 0,
      reps: 0
    };
    const exercisesCopy = Object.assign([], this.state.exercises);
    exercisesCopy[exerciseIndex] = Object.assign({}, exercisesCopy[exerciseIndex], { sets: exercisesCopy[exerciseIndex].sets.concat(setArray) });
    this.setState({ exercises: exercisesCopy });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    if (this.state.exerciseName === '') {
      return;
    }
    const updatedExercisesCopy = [...this.state.exercises];
    updatedExercisesCopy.unshift(
      {
        name: this.state.exerciseName,
        sets:
        [
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
      exercises: updatedExercisesCopy
    });
  }

  render() {
    const { exercises, workoutId, saveModalOpen } = this.state;
    const saveButton = exercises.length > 0
      ? ''
      : 'hidden';
    const modalToggle = saveModalOpen
      ? ''
      : 'hidden';
    const allExercises = exercises.map((exercise, exerciseIndex) => {
      const allSets = exercises[exerciseIndex].sets.map((set, setIndex) => {
        const iconChange = exercises[exerciseIndex].sets[setIndex].isCompleted
          ? 'solid'
          : 'regular';
        return (
          <div key={setIndex} className='input-container sets-padding'>
            <span>{setIndex + 1}</span>
            <span>
              <div className='reps-padding'>
                <input required onChange={event => this.handleRepsChange(exerciseIndex, setIndex, event)} className='number-input' type="number" name="reps" id="reps" value={exercises[exerciseIndex].sets[setIndex].reps} />
              </div>
            </span>
            <span>
              <div className='weight-padding'>
                <input required onChange={event => this.handleWeightChange(exerciseIndex, setIndex, event)} className='number-input' type="number" name="weight" id="weight" value={exercises[exerciseIndex].sets[setIndex].weight} />
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
              <p className='exercise-name'>{exercise.name}</p>
            </div>
            <form>
              <div className='sets-container'>
                <div className='row'>
                  <div className='col-full'>
                    <div className='header-container'>
                      <span>Sets</span>
                      <span>Reps</span>
                      <span>
                        <select className='select-tag'>
                          <option value="Pounds">lbs</option>
                          <option value="Kilos">Kg</option>
                        </select>
                      </span>
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
        <h1 className='workout-text'>Workout #{workoutId}</h1>
        <div className='exercises-button-container'>
          <button type="button" className="btn btn-primary exercises-button" data-bs-toggle="modal" data-bs-target="#exerciseNameModal">Add an exercise</button>
        </div>
        <div className='exercise-padding'>
          {allExercises}
        </div>
        <div className={`save-button-container ${saveButton}`}>
          <button type='button' className='btn btn-primary exercises-button' onClick={this.handleSaveModal}>Save Workout</button>
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
        <div className={`dark-background ${modalToggle}`}>
          <div className='centering-div'>
            <div className='modal-container'>
              <p className='save-modal-text'>Are you sure you want to save this workout? Incompleted sets will not be saved.</p>
              <div className='modal-button-container'>
                <button className='modal-cancel-button' onClick={this.handleSaveModal}>Cancel</button>
                <button className='modal-confirm-button' onClick={this.handleSaveWorkout}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

AddExercisePage.contextType = AppContext;
