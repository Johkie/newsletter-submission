import React from 'react';
import './App.css';
import LoginForm from './LoginForm'
import UserData from './UserData'

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {userId: 1};
  }

  handleLogin(id) {
    this.setState({
      userId: id,
    })
  }

  handleLogout() {
    this.setState({
      userId: null,
    })
  }

  render() {
    return (
      <div>
        {this.state.userId ?
          <UserData 
            userId={this.state.userId} 
            onLogout={() => this.handleLogout()} 
          />
        :
          <LoginForm 
            onLoggin={(id) => this.handleLogin(id)}
          />
        }
      </div>
    );
  }
}

export default App;
