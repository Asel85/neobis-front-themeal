import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MealDay from "./components/MealDay";
function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<MealDay />} />
      </Routes>
      </div> 
    </Router>
   
  );
}

export default App;
