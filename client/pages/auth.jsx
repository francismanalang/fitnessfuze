import React from 'react';
import SignUp from '../components/sign-up';
import SignIn from '../components/sign-in';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpPageOpen: true
    };
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
  }

  handleSignUpClick() {
    this.setState({ signUpPageOpen: !this.state.signUpPageOpen });
    window.location.hash = 'sign-up';
  }

  render() {
    const { signUpPageOpen } = this.state;
    const { user, route, handleSignIn } = this.context;
    const modalShow = () => {
      if (route.path === 'sign-up') {
        return (
          <SignUp
            key={route.path}
            action={route.path}
          />
        );
      }
      if (route.path === 'sign-in') {
        return (
          <SignIn
            key={route.path}
            action={route.path}
            onSignIn={handleSignIn}
          />
        );
      }
    };
    const signUpToggle = signUpPageOpen
      ? 'hidden'
      : '';
    const message = route.path === 'sign-up'
      ? 'Sign up for FitnessFuze'
      : 'Log in to FitnessFuze';

    if (user) return <Redirect to="" />;

    return (
      <>
      <div className='background-image'>
        <div className={`sign-up-container ${signUpToggle}`}>
          <div className='sign-up-icon'>
            <i className="fa-solid fa-address-book fa-2x"></i>
            <h4>{message}</h4>
          </div>
          {modalShow()}
        </div>
        <h3 className='log-in-text'>Document your fitness journey</h3>
        <button className='log-in-button' onClick={this.handleSignUpClick}>Sign Up</button>
      </div>
      </>
    );
  }
}

AuthPage.contextType = AppContext;
