import React, { useState, useEffect } from "react";
import Background from "../assets/background.jpg";
import LoginForm from "../components/Access/LoginForm";
import Features from "../components/DefaultHome/Features";
import OurTeam from "../components/DefaultHome/OurTeam";
import Footer from "../components/DefaultHome/Footer";
import NavBar from "../components/DefaultHome/NavBar";
import Hero from "../components/DefaultHome/Slogan";

function DefaultHome() {
    const [loginForm, setLoginForm] = useState(false);

    const toggleLoginForm = () => {
        setLoginForm(!loginForm);
    };

    const bgImage = {
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
    };

    return (
        <>
            <div style={bgImage}>
                <NavBar toggleLoginForm={toggleLoginForm} />
                <Hero toggleLoginForm={toggleLoginForm} />
            </div>
            <Features />
            <OurTeam />
            <Footer />
            <LoginForm
                toggleLoginForm={toggleLoginForm}
                loginForm={loginForm}
            />
        </>
    );
}

export default DefaultHome;
