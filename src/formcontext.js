import { createContext } from "react"
import { useState } from "react"
// Create Context
export  const FormContext= createContext({})

export default function Formprovider({children}){

// form state

const [form, setform]= useState({
    name:"",
    bio:"",
    gender:"",
    country:"",
    date:"",
    image:null,
    video:null  ,
    skills:[] 
  })

  // login state
const [login,setlogin]=useState(false);


// Provide context values to children
  return(
    <FormContext.Provider value={{form,setform,login,setlogin}}>
      {children}
    </FormContext.Provider>
  )

}





