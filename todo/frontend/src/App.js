import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from 'axios';
import UserList from './components/User';
import MenuList from './components/Menu';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
    }
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/users/").then(response => {
      const users = response.data
      this.setState({
        "users": users
      })
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <MenuList menu={this.state.menu} />
        <UserList users={this.state.users} />
        <Footer menu={this.state.footer} />
      </div>
    )
  }
}

export default App;
