import React from 'react';
import './App.css';
import LoginForm from './LoginForm'

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {userId: null};
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
          <div>
          HEJ PÅ DIG {this.state.userId}
          </div>
        :
          <div>
            <LoginForm onLoggin={(id) => this.handleLoggin(id)}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
