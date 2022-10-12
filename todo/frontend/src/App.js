import './App.css';
import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from './components/User';
import MenuList from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Project'
import TODOList from './components/TODO'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";



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
      todos: [],
      token: ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  load_data() {

    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/users/', { headers }).then(response => {
      this.setState({ "users": response.data.results })
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/Project/', { headers })
      .then(response => {
        this.setState({ "projects": response.data.results })
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/TODO/', { headers })
      .then(response => {
        this.setState({ "todos": response.data.results })
      }).catch(error => console.log(error))
  }



  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
      <Router>
        <header>
          <li>
            {this.is_authenticated() ? <button
              onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
          </li>

          <MenuList menuItems={this.state.menuItems} />
        </header>
        <main className="main">
          <div className="container">
            <Routes>
              <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
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
