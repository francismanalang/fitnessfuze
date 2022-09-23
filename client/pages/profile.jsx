import React from 'react';
import jwtDecode from 'jwt-decode';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      user: {}
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    const decoded = jwtDecode(token);
    this.setState({ user: decoded });
    fetch('/workouts/start', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${token}`
      }
    })
      .then(res => res.json())
      .then(workouts => {
        this.setState({ workouts });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { workouts, user } = this.state;
    const noWorkouts = workouts.length === 0
      ? ''
      : 'hidden';
    const workoutsReverse = workouts.reverse();
    const allWorkouts = workoutsReverse.map((workout, workoutIndex) => {
      const date = workout.createdAt.slice(0, 10);
      const allExercises = workout.exercises.map((exercise, exerciseIndex) => {
        const setsLength = exercise.sets.length;
        const topWeight = Math.max(...exercise.sets.map(set => set.weight));
        const topSet = [...exercise.sets.filter(set => Number(set.weight) === topWeight)];
        const topSetReps = topSet.length === 0 ? 0 : topSet[0].reps;
        const topSetWeight = topSet.length === 0 ? 0 : topSet[0].weight;
        const repText = topSetReps > 1 ? 'reps' : 'rep';
        return (
          <div className='row' key={exerciseIndex}>
            <div className='col-half'>
              <p className='sets-p-element'>{setsLength}x {exercise.name}</p>
            </div>
            <div className='col-half'>
              <div className='flex-end'>
                <div>
                  <p className='sets-p-element'>{topSetReps} {repText} @ {topSetWeight}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
      return (
        <div key={workoutIndex} className="workout-history-container">
          <div className='workout-history-header'>
            <h3 className='workout-number-text text-align-center'>Workout #{workout.workoutId}</h3>
            <p className='text-align-center'>{date}</p>
          </div>
          <div className='set-exercise-container'>
            <div className='exercise-set-header'>
              <h4 className='workout-h4-text'>Exercises:</h4>
              <h4 className='workout-h4-text'>Top Set:</h4>
            </div>
            {allExercises}
          </div>
        </div>
      );
    });
    return (
      <>
      <div className='profile-container'>
        <div className='profile-wrapper-workouts text-align-center'>
          <h1>{user.username}</h1>
          <p>Total Workouts: {workouts.length}</p>
        </div>
      </div>
        <h1 className='text-align-center workout-history-text'>Workout History</h1>
        <div className='workout-history-wrapper'>
          {allWorkouts}
          <p className={`text-align-center font-family ${noWorkouts}`}>Oh no! You have no workouts saved. Get a workout in and view it here!</p>
        </div>
      </>
    );
  }
}
