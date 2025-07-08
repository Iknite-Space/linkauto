import React from "react";
import FloatingCar from "./FloatingCar";

const ComingSoon = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        // padding: "80px 20px",
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#333",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "10px" , color: "white"}}>AutoLink</h1>
      <FloatingCar />
      <p style={{ fontSize: "20px", maxWidth: "600px", margin: "0 auto 30px"}}>
        Rent cars easily anywhere, anytime. Just pick, drive, and go.
      </p>
      <h2 style={{ fontSize: "32px", color: "#0077cc" }}>Coming Soon Near You!</h2>

      {/* <p className="text-red-500 text-2xl">tailwind</p> */}
    </div>
  );
};

export default ComingSoon;
