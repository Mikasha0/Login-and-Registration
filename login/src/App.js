import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./Pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
