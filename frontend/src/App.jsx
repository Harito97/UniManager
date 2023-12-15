import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Background from "./assets/background.jpg";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";

function App() {
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
      <TeamSection />
      <Footer />
      <LoginPopup toggleLoginPopup={toggleLoginPopup} loginPopup={loginPopup} />
    </>
  );
}

export default App;
