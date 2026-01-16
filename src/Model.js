import './App.css'

function Model({show,errormessage}){

    
    if(show){
    return(
 <div className="container1" >
    <div className="div4">
     <h1 style={{color:errormessage?"red":"green"}}>{errormessage ?errormessage:"Your account has been created successfully"}  
     </h1>
   </div>
 </div>

    );
  }
    else{
        return<></>
    }
}
export default Model;