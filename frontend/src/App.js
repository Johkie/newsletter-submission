import React from 'react';
import './App.css';
import LoginForm from './LoginForm'
import UserData from './UserData'

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {test: "yes"};
    
    // If a local id is saved, set it to the userid
    var localId = localStorage.getItem("userId");
    if (localId) {
      this.state.userId = localId;
    }
  }

  handleLogin(id) {
    this.setState({
      userId: id,
    })
    localStorage.setItem("userId", id);
  }

  handleLogout() {
    this.setState({
      userId: null,
    })

    localStorage.removeItem("userId");
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
