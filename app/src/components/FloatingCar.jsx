import React from "react";

const FloatingCar = () => {
  return (
    <>
      <img
        src="../../public/assets/Pic.png"
        alt="Floating Car"
        style={{
          width: "220px",
          margin: "30px auto",
          animation: "float 3s ease-in-out infinite",
          display: "block",
        }}
      />
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default FloatingCar;
