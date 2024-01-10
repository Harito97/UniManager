import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultHome from "./pages/DefaultHome";
// import Student from "./pages/Student";
// import Dashboard from "./components/Student/Dashboard";
// import MyCalendar from "./components/Student/MyCalendar";
import NotFound from "./pages/404";
// import Register from "./components/Student/Register";
// import Exam from "./components/Student/Exam";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;