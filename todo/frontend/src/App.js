import './App.css';
import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from './components/User';
import MenuList from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Project'
import TODOList from './components/TODO'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuItems: [
        { name: 'users', href: '/users' },
        { name: 'Project', href: '/Project' },
        { name: 'TODO', href: '/TODO' },
      ],
      users: [],
      projects: [],
      todos: []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(response => {
      this.setState({ "users": response.data.results })
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/Project/')
      .then(response => {
        this.setState({ "projects": response.data.results })
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/TODO/')
      .then(response => {
        this.setState({ "todos": response.data.results })
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <Router>
        <header>
          <MenuList menuItems={this.state.menuItems} />
        </header>
        <main className="main">
          <div className="container">
            <Routes>
              <Route exact path='/users' element={<UserList users={this.state.users} />} />
              <Route exact path='/Project' element={<ProjectList items={this.state.projects} />} />
              <Route exact path='/TODO' element={<TODOList items={this.state.todos} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    )
  }
}

export default App;
