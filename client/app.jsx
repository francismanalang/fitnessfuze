import React from 'react';
import StartPage from './pages/start-page';
import AddExercisePage from './pages/add-exercises';
import AuthPage from './pages/auth';
import AppContext from './lib/app-context';
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
    if (route.path === 'sign-up') {
      return <AuthPage />;
    }
    if (route.path === 'workouts') {
      const workoutId = route.params.get('workoutId');
      return <AddExercisePage workoutId={workoutId} />;
    }
  }

  render() {
    const { route } = this.state;
    const contextValue = { route };
    return (
      <AppContext.Provider value={contextValue}>
        <>
        { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}
