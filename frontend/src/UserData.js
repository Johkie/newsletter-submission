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
    console.log("hämtar data för id:", this.props.userId);

    let userId = this.props.userId;

    fetch(`http://localhost:3500/users/${userId}`, {
      "method": "GET",
      "headers": {"Content-Type": 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({
        userName: data.userName,
        email: data.email,
        subscriber: data.newsletterSub,
      })
    });
  }

  updateUserData = () => {
    console.log("uppdaterar skiten");
  }

  render() {
    
    return (
      <div>
        <div>
          <b>User:</b> 
          <input type="text" value={this.state.userName} />
        </div>
        <div>
          <b>Email:</b> 
          <input type="text" value={this.state.email} />
        </div>
        <div>
          <b>Subscriber:</b> 
          <input type="checkbox" checked={this.state.subscriber} />
        </div>
        <div>
          <input type="submit" value="Spara ändringar" onClick={this.updateUserData} />
        </div>
      </div>
    );
  }

} 

export default UserData;