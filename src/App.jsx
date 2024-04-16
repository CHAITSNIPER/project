import React, { useState } from 'react';
import './App.css';

const currentYear = 2024;
function App() {
  const [input, setinput] = useState({})
  const [age,setAge] = useState(0);
  const [password,setPassword] = useState('');
  
  const handleSubmit = (ev)=>{
    ev.preventDefault();
   const isEmptyField=Object.values(input).some(value=>value==='');
   if(isEmptyField){
    alert('Empty Fields Detected');
    return;
   }
    if(password.length < 8) {
      alert('password should have min 8 characters');
      setPassword('');
      return;
    }
    else alert('Form submitted');
  }
  const handleChange = (ev)=>{
    const name = ev.target.name;
    const value = ev.target.value;
    setinput({...input,[name]:value});

    if(name==='DateOfBirth'){
      const year = parseInt(value);
      if(!isNaN(year)){
        const age = currentYear-year;
        setAge(age);
      }
    }
    else setAge(0);
    
    if(name==='Password') setPassword(value);
  }
  
  return (
    <>
     <form className = "formie" onSubmit = {handleSubmit}>
        <label >Enter your Username: 
          <input className = "inp a" type="text"
          name = "userName"
          value = {input.userName||""}
          onChange={handleChange}
         />
        </label>
      <br></br>
       <br></br>

        <label>Your BirthYear: 
          <input className = "inp" type="number"
           name="DateOfBirth"
          value = {input.DateOfBirth||""}
          onChange = {handleChange}
          placeholder='YYYY'
          />
        </label>
        <br></br>
        <br></br>
        <label className="age">   Age: {age}</label>
        <br></br>
        <br></br>

        <label>Enter your password: </label>
        <input type="password"
        name = "Password"
        value = {input.Password||""}
        onChange = {handleChange}/>
        <br></br>
        <br></br>
        <input type = "submit" />
        
        
     </form>
    </>
  )
}

export default App
