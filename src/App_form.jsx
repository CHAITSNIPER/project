import React, { useState } from 'react';
import './App.css';

const currentYear = 2024;


function App({formData,onFormChange}) {
  const [input, setinput] = useState({})
  
  const [age,setAge] = useState(0);
  const [password,setPassword] = useState('');
  const [phone,setPhoneNo] = useState(0);
  const [userType,setUserType] = useState('');
  const [selectOption,setSelectOption]= useState('');
  const [UserID,GenerateUserID] = useState(0);
  const [responseData,setResponseData]=useState(null);
  
  const handleSubmit = async(ev)=>{
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
    if(phone < 1000000000 || phone > 10000000000 ){
       alert('phone number is invalid');
       return;
    }
    const number = Math.floor(Math.random()*(10000000000-100000000 + 1) + 10000000)
   
   
    GenerateUserID(number);

console.log(UserID);
setinput({...input, 'UserID': UserID});
console.log(input);
  try{
      const response =  fetch('http://localhost:5002/api/data',{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(input)
      });
      const data = response.json();
      setResponseData(data);
      alert('Form submitted, Stay on page while your UID is being generated');
  }
  catch(error){
      console.error('error fetching data:',error);
      alert('failed to submit form');
  }
};



  const handleChange = (ev)=>{
    const name = ev.target.name;
    const value = ev.target.value;
    onFormChange(name,value);
    setinput({...input,[name]:value});

    if(name==='DateOfBirth'){
      const year = parseInt(value);
      if(!isNaN(year)){
        const age = currentYear-year;
        setAge(age);
      }
      else setAge(0);
    }
   
    
    if(name==='Password') setPassword(value);

    if(name==='PhoneNo'){
      setPhoneNo(value);
    }
    if(name==='userType'){
      setUserType(value);
    }
    if(name==='Plan'){
      setSelectOption(value);
    }
  }

  return (
    <>
    <h1 className="heading">Welcome! Please Enter Your Details</h1>
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
        <label>Phone number:   </label>
        <input type= "number"
        name = "PhoneNo"
        value = {input.PhoneNo||""}
        onChange = {handleChange}/>
        <br></br>
        <br></br>
        <label>You are here as a </label><br></br>
            <input type="radio" name = "userType" value = "Artist" onChange={handleChange}/> Artist<br></br>
            <input type="radio" name = "userType" value = "Listener" onChange={handleChange}/> Listener<br></br>

            <p>You have chosen <nav className = "what"> {userType}</nav></p>
        <br></br>
        <label>What's your subscription Plan?</label>
             <select name = "Plan" value = {selectOption} onChange={handleChange}>
              <option value="Free">Free</option>
              <option value="Six Month plan">6months for $10</option>
              <option value="1 year plan">1 year for $18</option>
              
             </select><br></br>
             <p>You selected: <nav className="what">{selectOption}</nav></p>
        <input type = "submit" />
        <br></br>
        <div name="UserID" value={UserID}>Your generated UID : {UserID}</div>
     </form>
     
    </>
  )
}

export default App;
