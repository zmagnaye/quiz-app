import React from "react";
import Home from "../components/Home";
import Quiz from "../components/quiz";
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
      </Routes>
    </Router>
  );
}

export default App;
