import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MealDay from "./components/MealDay";
import MealDetails from "./components/MealDetails";
function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<MealDay />} />
        <Route path="/:id" element = {<MealDetails />} />
      </Routes>
      </div> 
    </Router>
   
  );
}

export default App;
