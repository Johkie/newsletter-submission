import React from 'react';

class UserData extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      subscriber: '',
    }
  }

  componentDidMount = () => {
    let userId = this.props.userId;

    fetch(`http://localhost:3500/users/${userId}`, {
      "method": "GET",
      "headers": {"Content-Type": 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        userName: data.userName,
        email: data.email,
        subscriber: data.newsletterSub,
      })
    });
  }

  updateUserData = () => {
    let userId = this.props.userId;

    fetch(`http://localhost:3500/users/${userId}/subscriber`, {
      "method": "PUT",
      "body": JSON.stringify({
        "id": userId,
        "email": this.state.email,
        "newsletterSub": this.state.subscriber
      }),
      "headers": {"Content-Type": 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      if(!data.sucessful) {
        console.log("Något gick fel!");
      }
    });
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value = (event.target.type === "text") ? event.target.value : event.target.checked;

    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <div>
        <div>
          <b>User:</b> 
          <input type="text" name="userName" value={this.state.userName} disabled={true} />
        </div>
        <div>
          <b>Email:</b> 
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
        </div>
        <div>
          <b>Subscriber:</b> 
          <input type="checkbox" name="subscriber" checked={this.state.subscriber} onChange={this.handleChange} />
        </div>
        <div>
          <input type="submit" value="Spara ändringar" onClick={this.updateUserData} />
        </div>
        <div>
          <input type="button" value="Logga ut" onClick={this.props.onLogout} />
        </div>
      </div>
    );
  }
} 

export default UserData;