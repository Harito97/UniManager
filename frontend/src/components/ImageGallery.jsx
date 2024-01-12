import React from "react";
import bg from "../assets/background.jpg"

const ImageGallery = () => {
  return (
    <>
      <div class="relative">
        <img
          src="https://source.unsplash.com/1600x900/?nature"
          alt="img"
          class="h-full rounded-xl object-cover"
        />

        <div class="absolute bottom-10 right-6 rounded bg-white bg-opacity-30 p-6 drop-shadow-lg backdrop-blur-sm">
          <span class="text-xl text-white">
            We've been uesing Untitle to kick"
            <br />
            start every new project and can't <br />
            imagine working without it."
          </span>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
