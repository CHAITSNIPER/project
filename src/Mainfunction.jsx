import { useState } from 'react';
import App from './App_form.jsx';
import SongPlaying from './SongPlaying.jsx';
import './mainFunc.css';
function Mainfunction(){
    const [currentPage,setCurrentPage] = useState('User');
    const [formData,setFormData] = useState({});
    const [userID, setUserID] = useState(0);
    //backend
    
    
const handleToggle=()=>{
    setCurrentPage(currentPage === 'User'?'Song':'User');
}
const handleFormChange=(name,value)=>{
    setFormData({...formData,[name]:value});
}
const handleSubmit = (ev)=>{
    ev.preventDefault();
}

return (
    <div>
        <button className='toggle' onClick={handleToggle}>Switch to {currentPage === 'User' ? 'Song' : 'User'}</button>
       
        {currentPage==='User'?(
            <App 
                formData = {formData}
                onFormChange = {handleFormChange}
                onSubmit = {handleSubmit}
                userID = {userID}
            />):(<SongPlaying formData = {formData}/>)
        }
    </div>
);
}
export default Mainfunction;