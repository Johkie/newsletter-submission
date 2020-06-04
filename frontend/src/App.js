import React from 'react';
import './App.css';
import LoginForm from './LoginForm'
import UserData from './UserData'

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {userId: 1};
  }

  handleLoggin(id) {
    this.setState({
      userId: id,
    })
  }

  render() {
    return (
      <div>
        {this.state.userId ?
          <UserData userId={this.state.userId} />    
        :
          <LoginForm onLoggin={(id) => this.handleLoggin(id)}/>
        }
      </div>
    );
  }
}

export default App;
