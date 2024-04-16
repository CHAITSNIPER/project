import React, { useState } from 'react';
import './song_playing.css';

let str='No';
function SongPlaying(){
    const [inputs,setInputs] = useState({});
    const [song,setSong] = useState('');
    const [liked,setLiked] = useState(false);
    const [genre,setGenre] = useState('');
    const [responseData,setResponseData]=useState(null);

    const handleChange = (ev)=>{
        const name = ev.target.name;
        const value = ev.target.value;
        setInputs({...inputs,[name] : value});
        if(name==='SongName') setSong(value);
        if(name==='Liked'){
            if(value === 'Yes'){
                setLiked(true);
             }
            else {
                setLiked(false)
            }
        }
        if(name==='Genre'){
            setGenre(value);
        }
    }

    const handleSubmit = async(ev)=>{
        ev.preventDefault();
        const isEmptyField=Object.values(inputs).some(value=>value==='');
        if(isEmptyField){
            alert('Empty Fields Detected');
            return;
           }
        if(song.length <=0){
            alert('empty fields');
            return;
        }
        console.log(inputs);
        try{
            const response =  await fetch('http://localhost:5002/api/data',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(inputs),
                
            });
            const data = response.json();
            setResponseData(data);
            alert('Form submitted, Stay on page while your UID is being generated');
       }
       catch{
        console.error('couldnt fetch data');
        alert('form not submitted');
       }
    }
    

     return(
        <>
        <h1>Enter song Details</h1>
        <form className = "formie2" onSubmit={handleSubmit}>
            <label>Song name: </label>
            <input type = "text" name = "SongName" value = {inputs.SongName||""} 
            onChange = {handleChange}/>
            <br></br>
            <br></br>

           <label>Liked or Not?</label><br></br>
           <input type = "radio" name = "Liked" value = "Yes" onChange={handleChange}/>Yes <br></br>
           <input type = "radio" name = "Liked" value = "No" onChange={handleChange}/>No <br></br>
           <br></br>
           <label>Genre:   </label>
           <input type = "text" name = "Genre" value = {inputs.Genre||""} onChange = {handleChange}/>
           <br></br>
           <br></br>
           <input type = "submit" value = "enter"/>
        </form >
        </>
     )
}

export default SongPlaying;