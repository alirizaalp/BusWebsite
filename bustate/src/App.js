import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './homepage/HomePage';
import SignUp from './signup/SignUp';
import Hakkında from './homepage/Hakkında';
import SeferlerListesi from './seferler/SeferlerListesi';
import Seferler from './seferler/Seferler';
import YolcumNerede from "./homepage/YolcumNerede";
import "./App.css"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/hakkında" element={<Hakkında />} />
        <Route path="/seferler" element={<SeferlerListesi seferler={Seferler} />} />
        <Route path="/YolcumNerede" element={<YolcumNerede />} />
      </Routes>
    </Router>
  );
}

export default App;
