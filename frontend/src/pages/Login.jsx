import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {

 const navigate = useNavigate();

 const [form,setForm] =
 useState({
  email:"",
  password:""
 });

 const handleChange = (e) => {

  setForm({
   ...form,
   [e.target.name]:
   e.target.value
  });

 };

 const handleSubmit =
 async (e) => {

  e.preventDefault();

  try {

   const res =
   await API.post(
    "/auth/login",
    form
   );

   localStorage.setItem(
    "token",
    res.data.token
   );

   navigate("/home");

  } catch(error) {

   alert("Login Failed");

  }

 };

 return (

<div className="container mt-5">

<h2>Login</h2>


<form onSubmit={handleSubmit}>

<input
className="form-control mb-3"
type="email"
name="email"
placeholder="Email"
onChange={handleChange}
/>

<input
className="form-control mb-3"
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
/>

<button
className="btn btn-primary"
>
Login
</button>

<div className="mt-3">

<button
  className="btn btn-success"
  onClick={() =>
    navigate("/signup")
  }
>
  Create Account
</button>

</div>

</form>

</div>



 );
 

}

export default Login;