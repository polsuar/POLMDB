import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar({handleSubmit, handleChange,user,handleLogout}) {
  return (

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/"><div className="navbar-brand" >POLMDB</div></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="text" placeholder="Search your Movie!" aria-label="Search" onChange={handleChange}/>
    </form>
    <ul className="navbar-nav mr-auto">
    {user.token?
    <><li className="nav-item ">
        <Link to="/favourites"><div className="nav-link" >Favourites</div></Link>
      </li>
      <li className="nav-item">
        <Link to="/login" onClick={handleLogout}><div className="nav-link" >Log out</div></Link>
    </li></>
      :
    <><li className="nav-item ">
      <Link to="/login"><div className="nav-link">Favourites</div></Link>
      </li>
      <li className="nav-item">
      <Link to="/login"><div className="nav-link">Log in</div></Link>
    </li></>
    }
    </ul>
  </div>

</nav>


  )
}

