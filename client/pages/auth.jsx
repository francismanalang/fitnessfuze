import React from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpPageOpen: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ signUpPageOpen: !this.state.signUpPageOpen });
  }

  render() {
    const { signUpPageOpen } = this.state;
    const { route } = this.context;
    const signUpToggle = signUpPageOpen
      ? 'hidden'
      : '';
    return (
      <>
      <div className='background-image'>
        <div className={`sign-up-container ${signUpToggle}`}>
          <div className='sign-up-icon'>
            <i className="fa-solid fa-address-book fa-2x"></i>
            <h4>Sign up for FitDiary</h4>
          </div>
          <AuthForm
            key={route.path}
            action={route.path}
          />
        </div>
        <h3 className='log-in-text'>Document your fitness journey</h3>
        <button className='log-in-button' onClick={this.handleClick}>Sign Up</button>
      </div>
      </>
    );
  }
}

AuthPage.contextType = AppContext;
