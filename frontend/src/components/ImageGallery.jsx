import React from "react";
import bg from "../assets/background.jpg";

const ImageGallery = () => {
  return (
    <>
      <div className="relative">
        <img
          src="https://source.unsplash.com/1000x1000/?nature"
          alt="img"
          className="h-full rounded-xl object-cover"
        />

        <div className="absolute bottom-10 right-6 rounded bg-white bg-opacity-30 p-6 drop-shadow-lg backdrop-blur-sm">
          <span className="xl:text-xl text-white">
            It does not matter
            <br />
            how slowly you go
            <br />
            as long as you do not stop.
          </span>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
