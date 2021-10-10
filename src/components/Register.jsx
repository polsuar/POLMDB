/* Register.jsx */
import React from "react";
// import loginImg from "../../login.svg";


export default function Register({handleRegister, onChangeEmail,onChangeFullname,onChangePassword}) {

  return (
    // <form
    //   className="form-group"
    //   onSubmit={handleRegister}
    // >
    // <label>Full Name</label>
    // <input
    //   className="form-control"
    //   placeholder="Full Name"
    //   onChange={onChangeFullname}
    // />
    // <label>Email</label>
    // <input
    //   className="form-control"
    //   placeholder="Email"
    //   onChange={onChangeEmail}
    // />
    // <label>Password</label>
    // <input
    //   className="form-control"
    //   placeholder="Password"
    //   onChange={onChangePassword}
    // />
    // <input type="submit" value="Submit" />
    // </form>

<form onSubmit={handleRegister}>
<div className="form-group">
  <label for="exampleInputName">Full Name</label>
  <input type="text" className="form-control" id="exampleInputName" aria-describedby="name" placeholder="John Doe" onChange={onChangeFullname}/>
</div>
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
</form>
  )
}

