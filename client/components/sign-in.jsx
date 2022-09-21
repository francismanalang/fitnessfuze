import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.location.hash = 'sign-up';
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/workouts/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.onSignIn(result);
          window.location.hash = '';
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const { handleChange, handleSubmit, handleClick } = this;
    return (
        <form className='form-flex' onSubmit={handleSubmit}>
          <div>
            <input
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="input-style" />
          </div>
          <div>
            <input
              required
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="input-style" />
          </div>
          <div className='sign-up-button-wrapper'>
            <button type='submit' className='sign-up-button'>Log In</button>
            <div className='sign-text-wrapper'>
              <p className='sign-text'>Don&#39;t have an account?</p>
              <p className='sign-text-bottom' onClick={handleClick}>sign up</p>
            </div>
          </div>
        </form>
    );
  }
}
