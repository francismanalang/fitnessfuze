import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/workouts/auth/${action}`, req)
      .then(res => res.json)
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = '';
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const { handleChange, handleSubmit } = this;
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
            <button type='submit' className='sign-up-button '>Sign Up</button>
            <p>Already a FitDiary member?</p>
          </div>
        </form>
    );
  }
}