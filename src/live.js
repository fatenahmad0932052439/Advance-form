import { Link } from "react-router-dom";
import { useContext, useState,useEffect } from "react";
import { FormContext } from "./formcontext";
import Model from "./Model";
import Cookies from "js-cookie";

function Live() {
  const { form,setform,login,setlogin } = useContext(FormContext);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const bac =
    form.name === "" ||
    form.bio === "" ||
    form.gender === "" ||
    form.skills.length === 0 ||
    form.country === "" ||
    form.date === "";

  const wordCount = form.bio.trim().split(/\s+/).length;

  function confirmSubmit() {

    setErrorMessage("");
    setShow(false);

    if (form.name.length <= 3) {
      setErrorMessage("The name is less than 3 characters");
      setShow(true);
    }

    if (!form.image) {
      setErrorMessage("No image uploaded");
      setShow(true);
    }

    if (!form.video) {
      setErrorMessage("No video uploaded");
      setShow(true);
    }

    if (wordCount < 30) {
      setErrorMessage("Bio must be at least 30 words");
      setShow(true);
    }

    const oldData = Cookies.get("formData"); 
    let isSame = false;
     if (oldData) { try { const parsed = JSON.parse(oldData);
         isSame = JSON.stringify(parsed) === JSON.stringify(form);
         } catch (err) { console.error("Error parsing old data", err); }}
     if(login && isSame){
        setErrorMessage("You already have an account");
        setShow(true);
     }


    setShow(true); 
    setlogin(true)
    

 // ✅ Save data in localStorage and cookies for 3 days

   
      const dataToSave = {
       ...form,
        image:
          form.image instanceof File
            ? URL.createObjectURL(form.image)
            : form.image,
        video:
          form.video instanceof File
            ? URL.createObjectURL(form.video)
            : form.video,
        }

            
    localStorage.setItem("login", JSON.stringify(true));
    localStorage.setItem("formData", JSON.stringify(dataToSave));
    const expiryDate = new Date();
   expiryDate.setDate(expiryDate.getDate() + 3);
   Cookies.set("formData", JSON.stringify(dataToSave), { expires: expiryDate}); 
   Cookies.set("login", JSON.stringify(true), { expires: expiryDate
  })
 
    
  }
  
 function showModel() {
    if (show) 
    setShow(false);
  }

    
  
   

 //Get login data from cookies when component loads 
  useEffect(() => {
        const cookieData = Cookies.get("login"); if (cookieData) 
        { try { const parsed = JSON.parse(cookieData); setlogin(parsed); } 
        catch (err) { console.error("Error parsing cookie data", err); }} },[]);

   const handleRemove = () => {
     Cookies.remove("formData");
     Cookies.remove("login");
     setform({ name:"", bio:"", gender:"", country:"", date:"", image:null, video:null, skills:[] }); 
     setlogin(false);
    };

 







  return (
    <>
      <div onClick={showModel}      >
        <div className="container">
          <Model show={show} errormessage={errorMessage} />
          <div className="form">
            <h1 style={{ textAlign: "center" }}>* Your information *</h1>

            <h1>Name: {form.name}</h1>
            <h1>About Me: {form.bio}</h1>
            <h1>Gender: {form.gender}</h1>
            <h1>Skills: {form.skills.join("-")}</h1>
            <h1>Country: {form.country}</h1>
            <h1>Date: {form.date}</h1>

            <div>
              <h1>Image Preview:</h1>
              {form.image && (
                <img
                  src={
                    form.image instanceof File
                      ? URL.createObjectURL(form.image)
                      : form.image
                  }
                  alt="preview"
                  width="200"
                />
              )}
            </div>

            <div >
              <h1>Video Preview:</h1>
              {form.video && (
                <video
                  src={
                    form.video instanceof File
                      ? URL.createObjectURL(form.video)
                      : form.video
                  }
                  width="200"
                  controls
                />
              )}
            </div>

            <Link to="/">
              <button
                  style={{ width: "100%" , cursor: "pointer", backgroundColor: "rgba(248, 221, 185, 1)" }}>
                 Edit data
               </button>
            </Link>

            <button
              type="submit"
              disabled={bac}
              onClick={confirmSubmit}
              style={{
                backgroundColor: bac
                  ? "rgba(100, 100, 100, 0.54)"
                  : "rgba(243, 125, 29, 1)",
                color: "black",
                fontSize: "20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
             >
             Create Acconut
            </button>

            <button
             
             
              style={{       
                 backgroundColor: !login  
                  ?  "rgba(100, 100, 100, 0.54)"
                  : "rgba(243, 125, 29, 1)",
                 color: "black",
                 fontSize: "20px",
                  borderRadius: "5px",
                 cursor: "pointer",
                 marginTop: "10px",
                 border:"2px solid rgba(100, 100, 100, 0.54)"
              }}
             >
             Login
            
            </button>

            <button 
             onClick={handleRemove} 
                style={{
                 backgroundColor: !login 
                  ?   "rgba(100, 100, 100, 0.54)"
                  : "rgba(243, 125, 29, 1)",
                 color: "black",
                 fontSize: "20px",
                 borderRadius: "5px",
                 cursor: "pointer",
                 marginTop: "10px",
                 border: "2px solid rgba(100, 100, 100, 0.54)"
              }}
             >Delete Account
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
export default Live;