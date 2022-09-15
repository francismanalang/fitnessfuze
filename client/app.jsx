import React from 'react';
import StartPage from './pages/start-page';
import AddExercisePage from './pages/add-exercises';
// import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <StartPage />;
    }
    if (route.path === 'workouts') {
      const workoutId = route.params.get('workoutId');
      return <AddExercisePage workoutId={workoutId} />;
    }
  }

  render() {
    return (
      <>
      { this.renderPage() }
      </>
    );
  }
}
