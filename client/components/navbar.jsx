import React from 'react';

export default class Navbar extends React.Component {
  render() {
    const { user } = this.context;
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fas fa-bolt me-2" />
            FitDiary
          </a>
          <div>
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
    );
  }
}
