import './App.css';
import {useContext,useEffect } from 'react';
import{FormContext} from './formcontext';
import { Link } from "react-router-dom"
import Cookies from 'js-cookie';

function Form() { 
  const {form, setform,login,setlogin} = useContext(FormContext);


function handleSkillChange(e) {
  const value = e.target.value;
  if (form.skills.includes(value)) {
    //  If the skill already exists → remove it
    setform({
      ...form,
      skills: form.skills.filter(skill => skill !== value)
    });
  } 
  else {
 // If the skill does not exist → add it
    setform({
      ...form,
      skills: [...form.skills, value]
    });
  }
  setlogin(false);
}



useEffect(() => {
const cookieData = Cookies.get("formData"); if (cookieData) 
  { try { const parsed = JSON.parse(cookieData); setform(parsed); } 
catch (err) { console.error("Error parsing cookie data", err); }} },[setform]);

useEffect(() => {
const cookieData = Cookies.get("formData"); if (cookieData) 
  { try { const parsed = JSON.parse(cookieData); setform(parsed); } 
catch (err) { console.error("Error parsing cookie data", err); }} },[]);







return(
  
  <div className='container'>
     <form className='form' style={{textAlign:"center"}}>
        <h1 style={{ textAlign:"center"}}>Registration form </h1>
        {/* Name input */}
        <label>Name </label>
        <input type='text' value={form.name} 
        onChange={(e) =>{setform({...form, name: e.target.value});setlogin(false)}} placeholder='Name'/>
        {/* About Me */}
        <label>About Me</label>
        <textarea style={{minHeight:"50px"}} value={form.bio} 
        onChange={(e) =>{ setform({...form, bio: e.target.value});setlogin(false)}} placeholder='About Me'/>
        {/* Gender */}
        <label>Gender</label>
        <div style={{display:"flex"}}>
         <label style={{marginLeft:"70px"}}>Female</label>
         <input type='radio'name='gender'  value="Female" checked={form.gender === "Female"} 
         onChange={(e) => {setform({...form, gender: e.target.value});setlogin(false)}} />
         <label style={{marginLeft:"40px"}}>Male</label>
         <input  type='radio' name='gender' value="Male" checked={form.gender === "Male"}
         onChange={(e) => {setform({...form, gender: e.target.value});setlogin(false)}} /> 
        </div>
        <hr></hr>
         {/* Skills */}
        <label>Skills</label>
       <div style={{display:"flex"}}>
         <label style={{marginLeft:"50px"}}>React</label>
         <input type='checkbox' checked={form.skills.includes("React")}
         name='skills' value="React" onChange={handleSkillChange} /> 
         <label style={{marginLeft:"30px"}}>JS</label>
         <input type='checkbox' name='skills' checked={form.skills.includes("Js")}
         value="Js" onChange={handleSkillChange} /> 
         <label style={{marginLeft:"30px"}}>Vue</label>
         <input type='checkbox' name='skills' checked={form.skills.includes("Vue")}
         value="Vue" onChange={handleSkillChange} /> 
       </div>
        {/* Country */}
       <label>Country</label>
       <select value={form.country} onChange={(e) => {setform({...form, country: e.target.value});setlogin(false) }}>
         <option value="" name="country">Select Country</option>
         <option value="Syria" name="country">Syria</option>
         <option value="Germany" name="country">Germany</option>
        </select>
        {/* Date of Birth */}
        <label>Date of Birth</label>
        <input type='date' value={form.date} 
        onChange={(e) => {setform({...form, date: e.target.value});setlogin(false)}} placeholder='Date of Birth'/>
        {/* Image Upload */}
       <label>Image Upload</label>
       <input step={{marginLeft:"50px" }} type='file'  placeholder='Image Upload' accept='image/*'
        onChange={(e)=>{setform({...form, image: e.target.files[0]});setlogin(false)}}/>
        {form.image && <p>✅ Image selected</p>}
        {/* Video Upload */}
       <label>Video Upload</label>
       <input type='file'  accept='video/*' placeholder='Video Upload'
       onChange={(e)=>{setform({...form, video: e.target.files[0]});setlogin(false)}}/>
       {form.video && <p>✅ Video selected</p>}
       <Link to="/live" style={{ display: "block", marginTop: "20px" }}>
       <button   style={{backgroundColor:"rgba(252, 252, 208, 1) ", color:"black", fontSize:"19px", borderRadius:"5px",cursor:"pointer",width:"100%"}}>Check your information </button>
         </Link>

    </form>

  </div>

);}

export default Form;
