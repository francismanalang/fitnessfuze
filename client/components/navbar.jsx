import React from 'react';

export default class Navbar extends React.Component {

  render() {
    const { user } = this.context;
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="#">
              <i className="fas fa-bolt me-2" />
              FitnessFuze
            </a>
            <div className='anchor-wrapper'>
              <div className='hidden-wrapper'>
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
              </div>
              {user !== null &&
                <button className="btn btn-dark">
                  Sign out
                  <i className="ms-2 fas fa-sign-out-alt" />
                </button>
              }
              {user === null &&
                <>
                  <a href="#sign-in" className="btn btn-primary">
                    Sign In
                  </a>
                  <a href="#sign-up" className="btn btn-dark">
                    Sign Up
                  </a>
                </>
              }
            </div>
          </div>
        </nav>
        <div className='hidden-wrapper-bottom'>
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
              <div className='max-wrapper-icon'>
                <a className='navbar-max' href="#max">
                  <i className="fa-solid fa-calculator fa-3x"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }
}
