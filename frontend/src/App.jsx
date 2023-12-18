import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Dashboard from "./components/Dashboard/Dashboard";
import Calendar from "./components/Dashboard/Calendar";
import NotFound from "./pages/404";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {token !== null ? (
            <Route path="/student/*" element={<Student />} />
          ) : (
            <>
              <Route exact path="*" element={<NotFound />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
