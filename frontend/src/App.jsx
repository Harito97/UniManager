import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Admin from "./pages/Admin";
import StudentDashboard from "./components/Student/Dashboard";
import StudentCalendar from "./components/Student/MyCalendar";
import TeacherDashboard from "./components/Teacher/Dashboard";
import TeacherCalendar from "./components/Teacher/MyCalendar";
import AdminDashboard from "./components/Admin/Dashboard";
import Manager from "./components/Teacher/Manager";
import NotFound from "./pages/404";
import Register from "./components/Student/Register";
import Exam from "./components/Student/Exam";
import Guide from "./components/Student/Guide";
import Form from "./components/Student/Form";
import StudentProfile from "./components/Student/UserProfile";
import TeacherProfile from "./components/Teacher/UserProfile";
import UserManager from "./components/Admin/UserManager";
import Contact from "./components/Student/Contact";
import { useContentContext } from "./context/UserContext";
import ClassManager from "./components/Admin/ClassManager";

function App() {
  const { user, level, loading } = useContentContext();

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {level === "SV" ? (
              <Route path="/student/" element={<Student user={user} />}>
                <Route exact path="/student/" element={<StudentDashboard />} />
                <Route
                  exact
                  path="/student/dashboard"
                  element={<StudentDashboard />}
                />
                <Route
                  exact
                  path="/student/calendar"
                  element={<StudentCalendar />}
                />
                <Route exact path="/student/register" element={<Register />} />
                <Route exact path="/student/exam" element={<Exam />} />
                <Route exact path="/student/guide" element={<Guide />} />
                <Route exact path="/student/form" element={<Form />} />
                <Route exact path="/student/contact" element={<Contact />} />

                <Route
                  exact
                  path="/student/setting"
                  element={<StudentProfile />}
                />
              </Route>
            ) : (
              <Route exact path="*" element={<NotFound />} />
            )}
            {level === "GV" ? (
              <Route path="/teacher/" element={<Teacher user={user} />}>
                <Route exact path="/teacher/" element={<TeacherDashboard />} />
                <Route
                  exact
                  path="/teacher/dashboard"
                  element={<TeacherDashboard />}
                />
                <Route exact path="/teacher/classes" element={<Manager />} />
                <Route
                  exact
                  path="/teacher/calendar"
                  element={<TeacherCalendar />}
                />
                <Route
                  exact
                  path="/teacher/setting"
                  element={<TeacherProfile />}
                />
              </Route>
            ) : (
              <Route exact path="*" element={<NotFound />} />
            )}
            {level === "AD" ? (
              <Route path="/admin/" element={<Admin user={user} />}>
                <Route exact path="/admin/" element={<AdminDashboard />} />
                <Route
                  exact
                  path="/admin/dashboard"
                  element={<AdminDashboard />}
                />
                <Route
                  exact
                  path="/admin/user_manager"
                  element={<UserManager />}
                />
                <Route
                  exact
                  path="/admin/class"
                  element={<ClassManager />}
                />
                <Route
                  exact
                  path="/admin/setting"
                  element={<TeacherProfile />}
                />
              </Route>
            ) : (
              <Route exact path="*" element={<NotFound />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
