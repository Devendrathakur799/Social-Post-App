import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Signup() {

 const navigate =
 useNavigate();

 const [form,setForm] =
 useState({
  username:"",
  email:"",
  password:""
 });

 const handleChange =
 (e)=>{

  setForm({
   ...form,
   [e.target.name]:
   e.target.value
  });

 };

 const handleSubmit =
 async(e)=>{

  e.preventDefault();

  await API.post(
   "/auth/signup",
   form
  );

  navigate("/");

 };

 return (

<div className="container mt-5">

<h2>Signup</h2>

<form onSubmit={handleSubmit}>

<input
className="form-control mb-3"
name="username"
placeholder="Username"
onChange={handleChange}
/>

<input
className="form-control mb-3"
name="email"
placeholder="Email"
onChange={handleChange}
/>

<input
className="form-control mb-3"
name="password"
placeholder="Password"
type="password"
onChange={handleChange}
/>

<button
className="btn btn-success"
>
Signup
</button>

</form>

</div>

 );

}

export default Signup;