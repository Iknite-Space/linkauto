import AccordionDemo from "./Accordion";

const Faq = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <div className="w-screen bg-white shadow-md rounded-lg p-6 ">
          {/* Flex row layout: image left, content right */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: Image */}
            <div className="w-full max-w-xl h-auto">
              <img
                src="/assets/faq.png"
                alt="FAQ"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Right: Text + Accordion */}
            <div className="flex flex-col items-center justify-center lg:items-center w-full lg:w-auto">
              <div className="flex-1 text-center lg:text-center w-full ">
                <h2 className="text-black font-bold">FAQ</h2>
                <h1 className="text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-lg mb-6">
                  Here are some common questions and answers to help you
                  understand our service better.
                </p>

                <div className="flex justify-center lg:justify-start ">
                  <div className="w-full max-w-xl ">
                    <AccordionDemo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
