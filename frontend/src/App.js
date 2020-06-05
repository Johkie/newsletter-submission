import React from 'react';
import './App.css';
import LoginForm from './LoginForm'
import UserData from './UserData'
import RegisterForm from './RegisterForm';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {"userId": null};
    
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
        <div>
          <LoginForm 
            onLoggin={(id) => this.handleLogin(id)}
          />
          <RegisterForm />
        </div>
        }
      </div>
    );
  }
}

export default App;
