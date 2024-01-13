import React, { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const ImageGallery = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShouldRender(true);
    }, 1000);
  }, []);

  return (
    <>
      <div className="relative">
        <img
          src="https://source.unsplash.com/900x900/?nature"
          alt="img"
          className="rounded-xl object-cover"
        />

        {shouldRender && (
          <>
            <div className="absolute bottom-10 right-6 rounded bg-white bg-opacity-30 p-6 drop-shadow-lg backdrop-blur-sm">
              <span className="text-white xl:text-xl">
                It does not matter
                <br />
                how slowly you go
                <br />
                as long as you do not stop.
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageGallery;
