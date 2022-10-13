import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {

  render() {
    const { user, handleSignOut } = this.context;
    const userHide = user === null ? 'hidden' : '';
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="#">
              <i className="fas fa-bolt me-2" />
              FitnessFuze
            </a>
            <div className='anchor-wrapper font-family'>
              <div className={`hidden-wrapper ${userHide}`}>
                <div className='profile-wrapper'>
                  <a className='navbar-profile' href='#profile'>
                    Profile
                  </a>
                </div>
                <div className='start-wrapper'>
                  <a className='navbar-start' href='#'>
                    Start
                  </a>
                </div>
                <div className='calculator-wrapper'>
                  <a className='navbar-calculator' href='#calculator'>
                    1RM
                  </a>
                </div>
              </div>
              {user !== null &&
                <button className="btn btn-dark" onClick={handleSignOut} href='#sign-in'>
                  Sign out
                  <i className="ms-2 fas fa-sign-out-alt" />
                </button>
              }
            </div>
          </div>
        </nav>
        <div className={`hidden-wrapper-bottom ${userHide}`}>
          <nav className="navbar navbar-dark bg-dark fixed-bottom">
            <div className="container navbar-icon-wrapper">
              <div className='profile-wrapper-icon'>
                <a className='navbar-profile' href='#profile'>
                  <i className="fa-regular fa-circle-user fa-3x"></i>
                </a>
              </div>
              <div className='start-wrapper-icon'>
                <a className='navbar-start' href='#'>
                  <i className="fa-solid fa-dumbbell fa-3x"></i>
                </a>
              </div>
              <div className='calculator-wrapper-icon'>
                <a className='navbar-calculator' href="#calculator">
                  <i className='fa-solid fa-calculator fa-3x'></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }
}

Navbar.contextType = AppContext;
