import React from "react";
import ComingSoon from "./ComingSoon";
import Faq from "./Faq";

const HomePage = () => {
  return (
    <>
      <div className="my-4" id="hero">
        <ComingSoon />
      </div>
      <div className="my-4" id="FAQ">
        <Faq />
      </div>
    </>
  );
};

export default HomePage;
