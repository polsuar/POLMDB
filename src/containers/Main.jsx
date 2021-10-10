import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Movies from '../components/Movies'
import SingleMovie from '../components/SingleMovie'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Register from '../components/Register'
import AddFavs from '../components/AddFavs'
import RemoveFavs from '../components/RemoveFavs'
import MyFavs from '../components/MyFavs'
export default class Main extends Component {
  constructor(){
    super()
    this.state={
      movies:[],
      selectedMovie: {},
      input:'',
      isLogginActive: false,
      full_name: "",
      email:"",
      password: "",
      user: JSON.parse(localStorage.getItem("user"))||{},
      favourites: JSON.parse(localStorage.getItem("favs"))||[]
    }
    this.selectMovie=this.selectMovie.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
  }

  componentDidMount(){
    axios.get(`http://www.omdbapi.com/?apikey=817cb2d9&s=war&page=1&
    `)
    .then(res=> res.data.Search)
    .then(movies=> {
      this.setState({movies})
    })
  }
  
  handleChange(event) {
    const input=event.target.value
    this.setState({input});
  }

  handleSubmit(event) {
    event.preventDefault(); 
    axios.get(`http://www.omdbapi.com/?apikey=817cb2d9&s=${this.state.input}`)
    .then(res=> res.data.Search)
    .then(movies=> {
      this.setState({movies})
    })
    .catch(e=>console.log(e))
    this.props.history.push("/")
  }

  addFavourite(movie){
    const favourites=[...this.state.favourites, movie]
    if(!this.state.favourites.includes(movie)){
    this.setState({favourites})
    localStorage.setItem("favs",JSON.stringify(favourites))
    alert("Añadido a favoritos!")
  }
  }

  removeFavourite(movie){
    const favourites = this.state.favourites.filter((favourite) => favourite !== movie)
    this.setState({favourites})
  }

  selectMovie(movieId) {
    axios.get(`http://www.omdbapi.com/?apikey=817cb2d9&i=${movieId}`)
      .then(res => res.data)
      .then(selectedMovie => {
        this.setState({selectedMovie});
      })
      .catch(e=>console.log(e))
  }

  onChangeFullname(e) {
    this.setState({
      full_name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();
    axios.post("api/register", {
      full_name:this.state.full_name,
      email:this.state.email,
      password:this.state.password
    })
    .catch(e=>console.log(e))
    this.props.history.push("/login")
  }

  handleLogin(e) {
    e.preventDefault();
    axios.post("api/login", {
      email:this.state.email,
      password:this.state.password
    })
    .then(user=>{
      this.setState({user:user.data})
      localStorage.setItem("user",JSON.stringify(user.data))
      this.props.history.push("/")})
    .catch(e=>console.log(e))
  }

  handleLogout(){
    this.setState({user:{}})
    localStorage.removeItem("user")
  }

  render() {
    const {movies, selectedMovie,user, favourites}=this.state
    return (
    <div class="footer-dark">
      <div id="main">
        <Navbar 
        user={user}
        handleLogout={this.handleLogout}
        handleSubmit={this.handleSubmit} 
        handleChange={this.handleChange} />
        <div className="container-fluid movie-app">
          <Switch>
            <Route exact path="/login" render={() => <Login 
              handleLogin={this.handleLogin}
              onChangeEmail={this.onChangeEmail}
              onChangePassword={this.onChangePassword}/> }/>
            <Route exact path="/register" render={() => <Register 
              handleRegister={this.handleRegister}
              onChangeFullname={this.onChangeFullname}
              onChangeEmail={this.onChangeEmail}
              onChangePassword={this.onChangePassword}/> } />
            <Route exact path="/movies" render={() => <Movies addFavourite={this.addFavourite} movies={movies} favs={AddFavs}/> } />
            <Route exact path="/favourites" render={() => <MyFavs removeFavourite={this.removeFavourite} movies={favourites} favs={RemoveFavs}/> } />
            <Route path="/movies/:movieId" render={({ match }) => (<SingleMovie movie={selectedMovie} selectMovie={this.selectMovie} movieId={match.params.movieId}/>)} />
            <Redirect from="/" to="/movies" />
          </Switch>
        </div>  
      </div>
        <Footer />
    </div>


    )
  }
}
