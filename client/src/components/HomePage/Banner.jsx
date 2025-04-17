import React from "react";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[70vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://s29814.pcdn.co/wp-content/uploads/2022/12/shutterstock_1847661151.jpg.optimal.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  );
};

export default Banner;
