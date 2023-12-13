import React from "react";

const Hero = ({toggleLoginPopup}) => {
  return (
    <>
      <main>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <h1 className="text-center md:w-[550px] font-dancing text-4xl sm:text-6xl md:text-8xl text-white mix-blend-difference">
            Adopt the pace of nature.
          </h1>
          <p className="text-white mix-blend-difference">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded-full"
          onClick={() => {
            toggleLoginPopup(true);
          }}>Join Now</button>
        </div>
      </main>
    </>
  );
};

export default Hero;
