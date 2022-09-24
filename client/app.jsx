import React from 'react';
import StartPage from './pages/start-page';
import AddExercisePage from './pages/add-exercises';
import AuthPage from './pages/auth';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Navbar from './components/navbar';
import Profile from './pages/profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    if (this.isAuthorizing) return null;
    const { route, username } = this.state;
    if (route.path === '') {
      return <StartPage />;
    }
    if (route.path === 'profile') {
      return <Profile username={username} />;
    }
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      return <AuthPage />;
    }
    if (route.path === 'workouts') {
      const workoutId = route.params.get('workoutId');
      return <AddExercisePage workoutId={workoutId} />;
    }
  }

  render() {
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar />
          { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}
