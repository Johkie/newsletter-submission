import React from 'react';

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      "username": '', 
      "password": '',
      "email": '',
      "subscribe": true
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.username !== '' && this.state.password !== '' && this.state.email !== '') {

      fetch("http://localhost:3500/users/", {
        "method": "POST",
        "body": JSON.stringify({
          "userName": this.state.username,
          "password": this.state.password,
          "email": this.state.email,
          "newsletterSub": this.state.subscribe
        }),
        "headers": {"Content-Type": 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          username: '',
          password: '',
          email: '',
          subscribe: true
        });
      });
    }
    else {
      console.log("fyll i fälten!")
    }
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value = (event.target.type === "checkbox") ? event.target.checked : event.target.value;

    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            Användarnamn: 
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
            Lösenord: 
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            Email: 
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
            Nyhetsbrev:
            <input type="checkbox" name="subscribe" checked={this.state.subscribe} onChange={this.handleChange} />
          </div>
          <input type="submit" value="Registera"/>
          </form>
      </div>
    )
  };

}

export default RegisterForm;