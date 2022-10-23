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
import ProjectForm from './components/ProjectForm';
import TODOForm from './components/TODOForm';
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

  create_project(title, link, users) {
    const headers = this.get_headers()
    const data = { Title: title, Link: link, Users: users }

    axios.post(`http://127.0.0.1:8000/api/Project/`, data, { headers })
      .then(response => {
        this.load_data()
      }).catch(error => console.log(error))
  }

  create_TODO(project, note, creator) {
    const headers = this.get_headers()
    const data = { project: project, note: note, creator: creator }

    axios.post(`http://127.0.0.1:8000/api/TODO/`, data, { headers })
      .then(response => {
        this.load_data()
      }).catch(error => console.log(error))
  }

  delete_project(id) {
    const headers = this.get_headers()

    axios.delete(`http://127.0.0.1:8000/api/Project/${id}`, { headers })
      .then(response => {
        this.load_data()
      }).catch(error => console.log(error))
  }

  delete_todo(id) {
    const headers = this.get_headers()

    axios.delete(`http://127.0.0.1:8000/api/TODO/${id}`, { headers })
      .then(response => {
        this.load_data()
      }).catch(error => console.log(error))
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
              <Route exact path='/Project' element={<ProjectList items={this.state.projects} delete_project={(id) => this.delete_project(id)} />} />
              <Route exact path='/Project/create' element={<ProjectForm users={this.state.users} create_project={(title, link, users) => this.create_project(title, link, users)} />} />
              <Route exact path='/TODO' element={<TODOList items={this.state.todos} delete_todo={(id) => this.delete_todo(id)} />} />
              <Route exact path='/TODO/create' element={<TODOForm users={this.state.users} projects={this.state.projects} create_TODO={(project, note, creator) => this.create_TODO(project, note, creator)} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    )
  }
}

export default App;
