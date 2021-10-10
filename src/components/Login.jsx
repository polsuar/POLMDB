/* login.jsx */
import React from "react";
import {Link} from 'react-router-dom'

export default function Login({handleLogin, onChangeEmail,onChangePassword}) {
  return (
<form onSubmit={handleLogin}>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@mail.com" onChange={onChangeEmail}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="*******" onChange={onChangePassword}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/register" ><button className="btn btn-secondary">Register</button></Link>
</form>
)
}
