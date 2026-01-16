import './App.css';
import Form from './form';
import Formprovider from './formcontext';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Live from './live';

function App() {


  return(
 <Formprovider>
    {/* Define app routes */}
    <Router>
     

      <Routes>
        {/* Main form page  */}
         <Route path="/" element={<Form />} />
        {/* Live preview page */}
         <Route path="/live" element={<Live />} />
      </Routes>

    </Router>

  </Formprovider>
  )

}
export default App;