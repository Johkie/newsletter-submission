import React from 'react';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      userNameValue: '',
      passwordValue: '',
     };
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    
    fetch("http://localhost:3500/users/login", {
      "method": "POST",
      "body": JSON.stringify({
        "userName": this.state.userNameValue,
        "password": this.state.passwordValue,
      }),
      "headers": {"Content-Type": 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      
      if(data.id) {
        this.props.onLoggin(data.id);
      }
    });
  }

  handleChange = (event) => {
    const key = (event.target.name === 'username') ? 'userNameValue' : 'passwordValue';

    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    return(
      <div>
        <h2>Login:</h2>
        <form onSubmit={this.handleSubmit}>
          Användarnamn: 
          <input type="text" name="username" value={this.state.userNameValue} onChange={this.handleChange} />
          Lösenord: 
          <input type="password" name="password" value={this.state.passwordValue} onChange={this.handleChange} />
          <input type="submit" value="Logga in" />
        </form>
      </div>
    )
  };
}

export default LoginForm;