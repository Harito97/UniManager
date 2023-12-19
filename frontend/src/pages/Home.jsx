import React, { useState,  useEffect  } from "react";
import NavBar from "../components/LandingPage/Navbar";
import Hero from "../components/LandingPage/Hero";
import Background from "../assets/background.jpg";
import LoginPopup from "../components/LandingPage/LoginPopup/LoginPopup";
import Features from "../components/LandingPage/Features";
import TeamSection from "../components/LandingPage/TeamSection";
import Footer from "../components/LandingPage/Footer";

function Home() {
  const [loginPopup, setLoginPopup] = useState(false);

  const toggleLoginPopup = () => {
    setLoginPopup(!loginPopup);
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
        <NavBar toggleLoginPopup={toggleLoginPopup} />
        <Hero toggleLoginPopup={toggleLoginPopup} />
      </div>
      {/* <Backdrop toggleLoginPopup={toggleLoginPopup} loginPopup={loginPopup} /> */}
      <Features />
      <TeamSection />
      <Footer />
      <LoginPopup toggleLoginPopup={toggleLoginPopup} loginPopup={loginPopup} />
    </>
  );
}

export default Home;
